import { CoinRewardModel } from '../model/coinRewardModel';
import { ComponentModel } from '../model/componentModel';
import { CustomQuestModel } from '../model/customQuestModel';
import { CustomReqModel } from '../model/customReqModel';
import { DialogueLineModel } from '../model/dialogueLineModel';
import { ExpRewardModel } from '../model/expRewardModel';
import { ItemQuestModel } from '../model/itemQuestModel';
import { NoteModel } from '../model/noteModel';
import { NpcHeadModel } from '../model/npcHeadModel';
import { NpcModel } from '../model/npcModel';
import { QuestTypeEnum } from '../enum/questTypeEnum';
import { RecipeRewardModel } from '../model/recipeRewardModel';
import { TalentRewardModel } from '../model/talentRewardModel';

export class NpcBase { constructor(public id: string, public data: NpcModel) { } }



export const initNpcRepo = () => {
    return [    
        new NpcBase("TP Pete", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Rats Nest",
                    "world": "Blunder Hills",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.31,
                    "starSign": "Leo",
                    "mothersMaidenName": "Perez",
                    "notes": "[[TP Pete]] is found in [[Worlds#S2 - Rats Nest|Rat's Nest]], the second zone of the sewers$NEWLINE$$NEWLINE$You must complete all three of his quests and talk to him after reaching Class Level 70 in order to receive the {{CraftReq|TP Pete Token}}, which falls on the ground.$NEWLINE$$NEWLINE$Type 'More like Poopy Pete' while standing next to him to receive {{Talentbook|Toilet Paper Postage}}.$NEWLINE$"
                },
                "quests": {
                    "Roll of Anger": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "That's it I've had it with this place! I want retribution and I want it NOW! <br> QUEST:Go defeat 40 poops in 200 seconds.",
                        "NextIndex": 4,
                        "Name": "Roll of Anger",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 2},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 2},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 13000}
                        ],
                        "QuestName": "TP Pete1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "TP Pete1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Poops Defeated:", "finalV": 40, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 200}
                        ]
                    },
                    "The Rats are to Blame!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You know what I bet one of these darn rats stole it! They came in from the surface one day and have been hogging up all the jobs ever since! <br> QUEST: Defeat rats for employment research!",
                        "NextIndex": 7,
                        "Name": "The Rats are to Blame!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "StoneT2", "quantity": 2}, <ComponentModel>{"item": "ExpBalloon1", "quantity": 2}],
                        "QuestName": "TP Pete2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Quest14", "quantity": 50}]
                    },
                    "Fired for BS Reasons!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "My boss is a total piece of.... well you'll see when you meet him! His office is to the left. <br> QUEST:Reinstate Pete as Comissioner.",
                        "NextIndex": 12,
                        "Name": "Fired for BS Reasons!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentTools10", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 30000}
                        ],
                        "QuestName": "TP Pete3",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": "[[Job Application]] drops from [[Dr Defecaus]]"},
                        "ItemReq": [<ComponentModel>{"item": "JobApplication", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey you! Yes you the one who isn't poop... think you could help me out?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I just lost my job. Stupid poops they think they're so much better than me! I was made to be better than them literally!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "That's it I've had it with this place! I want retribution and I want it NOW! <br> QUEST:Go defeat 40 poops in 200 seconds.",
                        "NextIndex": 4,
                        "Name": "Roll of Anger"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Not enough inventory space! Clear some space and talk to me again!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hah that'll show them! But for some reason blindly taking out my rage on others didn't actually make me feel better... I guess I still miss my old job and all that.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You know what I bet one of these darn rats stole it! They came in from the surface one day and have been hogging up all the jobs ever since! <br> QUEST: Defeat rats for employment research!",
                        "NextIndex": 7,
                        "Name": "The Rats are to Blame!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Not enough inventory space! Clear some space and talk to me again!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Great this will prove my case! I'll get my job back for sure and maybe even a pay-raise! <br> Return at Class Lv. 45",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I can't believe this!!! These so called 'statisticians' which doesn't even sound like a real job told me my stats were 'utterly invalid in every sence of the word' and that I shouldn't be angry at others for my own problems!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That's it we're going straight to the source I have no other choice. I need you to confront my old boss for me.",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "My boss is a total piece of.... well you'll see when you meet him! His office is to the left. <br> QUEST:Reinstate Pete as Comissioner.",
                        "NextIndex": 12,
                        "Name": "Fired for BS Reasons!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You got me my job back! Now I can get paid while I sit here and do nothing! What did you think I got fired for no reason?",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.SpaceRequired,
                        "DialogueText": "Thanks for helping but please come back when you have 2 open inventory spaces!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Ahh life is finally as it should be and the good guy me prevailed! You should come back later though I'm sure there are some rotten apples out there who will try to ruin things! <br> Return at Class Lv. 60",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh whats going on gamer? Glad to see you I forgot to give you this token last time around!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well catch you later when you're higher level! <br> What? Oh did I say level 60 before? I meant 160... thousand. Yea come back at Lv. 160000 and I'll probably have a new quest by then. <br> Return at Class Lv. 160000",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Secretkeeper", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Tutorial",
                    "world": "Tutorial",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "Secret",
                    "birthWeight": 1.57,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Rodriguez",
                    "notes": "The [[Secretkeeper]] is a [[Secrets|Secret]] character, only found in the tutorial area.$NEWLINE$"
                },
                "quests": {
                    "The Few, the Proud": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "'... but here's the thing. There are TWO parts to this secret! Bring me a Secretstone to prove to me that you're truely a high IQ gamer!' <br> QUEST:Find the Secretstone",
                        "NextIndex": 3,
                        "Name": "The Few, the Proud",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ExpRewardModel>{"item": "Experience0", "quantity": 1337}, <CoinRewardModel>{"item": "", "quantity": 1337}],
                        "QuestName": "Secretkeeper1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Secretstone", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah... welcome true gamer. You have come back here in the hopes of a secret a wise decision indeed!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I haven't much to say personally... instead I will let the Game's Creator Lavaflame2 speak to you through me: <br> 'Yoo wuddup gamer happy to see you here most people are too dumbo maximus to find this little easter egg!'",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "'... but here's the thing. There are TWO parts to this secret! Bring me a Secretstone to prove to me that you're truely a high IQ gamer!' <br> QUEST:Find the Secretstone",
                        "NextIndex": 3,
                        "Name": "The Few, the Proud"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Yo wtf? You figured it out?? Nice! Here take your reward of absolutely nothing! <br> Although I don't want to leave you empty handed... how about this I'll mark this quest as completed in your Codex after the tutorial as proof that you're a true gamer!'",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Oh and um one more thing yea? I figure you'll wanna write this down 3-6-3-9-0-blue. Hahaha aight Imma head out see ya.' <br> ... ouch that gave me a headache I still don't get why the game developer can't just talk to his own gamers directly?",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hmm you're still here? I don't have any more quests to give you... after all I am a secretkeeper not a secretgiver!",
                        "NextIndex": 9999,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Game Message", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Unknown",
                    "world": "Unknown",
                    "noQuest": 0,
                    "repeatable": "Unknown",
                    "type": "Unknown",
                    "birthWeight": 8.8,
                    "starSign": "Gemini",
                    "mothersMaidenName": "Davis",
                    "notes": ""
                },
                "quests": {},
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wut wuuuut!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Unmade Character", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Unknown",
                    "world": "Unknown",
                    "noQuest": 0,
                    "repeatable": "Unknown",
                    "type": "Unknown",
                    "birthWeight": 6.63,
                    "starSign": "Leo",
                    "mothersMaidenName": "Leisinger",
                    "notes": ""
                },
                "quests": {},
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey there what's your name? ...wait what's my name? What even am I? Am I alive?? Am I dead?? WHAT IS THIS PLACE???",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "How do I even breath?? Do I have lungs? Do I even need to breath since I'm basically made of air?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh no what if the game gets uninstalled before I'm even created? I'll be stuck like this forever and ever!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "And what are all those other spaces to my right are there going to be more things just like me later on?",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What if the player gets bored before making them? Will they suffer for all eternity forced to contemplate the faint glow of their existance?",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Even worse what if the player is an avid reader? Will they continue postponing my creation just to keep reading my frightened ramblings?",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What did I even do to deserve this? Did I cheat at a mobile game in a past life or even worse did I make mobile games in a past life?",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "And why am I so... undefined? It's like im made up of a bunch of little squares ... I'd say this is some sort of cube world if this game were more abandoned",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're uh... awfully slow at choosing a name! No rush or anything it's not like im having an existential crisis here.",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Tell you what if you give me a name I'll give you a cool ring! I'm not even sure what a ring is or why I have one in the first place or how to even give it to you...",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So is that a deal? Type a name in and create me if you agree!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Sprout", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "The Base Of The Bark",
                    "world": "Blunder Hills",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 4.51,
                    "starSign": "Virgo",
                    "mothersMaidenName": "Gonzalez",
                    "notes": "[[Sprout]] is found in [[Worlds#T1 - The Base Of The Bark|The Base of the Bark]], the first zone of the tree, located at the top right of the area.$NEWLINE$$NEWLINE$His final quest awards the {{CraftReq|Sproutinald Token}}.$NEWLINE$"
                },
                "quests": {
                    "Sticks and Stone Something Something Bones...": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But mommy said sticks and stones CAN hurt me! But if I had all the sticks and stones I'd be invincible! QUEST:Collect all the sticks and stones so Sprout won't ever break his bones.",
                        "NextIndex": 5,
                        "Name": "Sticks and Stone Something Something Bones...",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentStatues8", "quantity": 12},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 3},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 25000}
                        ],
                        "QuestName": "Sprout1",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "TreeInterior1", "quantity": 500}, <ComponentModel>{"item": "Iron", "quantity": 1500}]
                    },
                    "Justice Wears No Clothes": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "If you can beat them up in your underwear they'll be too embarassed to make fun of anyone! QUEST: Defeat stick monsters with no clothes equipped just a weapon.",
                        "NextIndex": 8,
                        "Name": "Justice Wears No Clothes",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentPants16", "quantity": 1},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 10000}
                        ],
                        "QuestName": "Sprout2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Sprout2",
                        "CustomArray": [<CustomReqModel>{"desc": "Unclothed Kills:", "finalV": 30, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Shoe Shopping with Sprout": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well daddy once told me that sometimes bodies grow because of what's around them. Maybe if I put shoes on my body would grow legs and feet to fill them? <br> QUEST:Get a bunch of shoes for Sprout to try on.",
                        "NextIndex": 11,
                        "Name": "Shoe Shopping with Sprout",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentShirts17", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience3", "quantity": 1200}
                        ],
                        "QuestName": "Sprout3",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [
                            <ComponentModel>{"item": "EquipmentShoes15", "quantity": 2},
                            <ComponentModel>{"item": "EquipmentShoes7", "quantity": 2},
                            <ComponentModel>{"item": "EquipmentShoes9", "quantity": 2}
                        ]
                    },
                    "Frisbee Fanatic": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hi! Are you ok? <br> Oh right! The frisbee... can you get me my frisbee by yourself? Pretty please? <br> QUEST:Get the frisbee back from the top of this tree.",
                        "NextIndex": 14,
                        "Name": "Frisbee Fanatic",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken12", "quantity": 1},
                            <ComponentModel>{"item": "EquipmentRings12", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience3", "quantity": 5000}
                        ],
                        "QuestName": "Sprout4",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Quest15", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Omg hi hi hi! My name is Sproutinald but everyone calls me Sprout! You should too!! I can tell by the way you tapped on me that were gonna be best friends for real! But first you gotta do something for me or I'll kick you haha!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I came in here looking for my red frisbee! I was throwing it with my friend despite having no hands or arms and it got stuck on the top of this tree!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I would get it myself but these meanie stick monsters keep making fun of my flower! Mommy tells me my flower is pretty and everyone else is just jealous and that words will never hurt me!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But mommy said sticks and stones CAN hurt me! But if I had all the sticks and stones I'd be invincible! QUEST:Collect all the sticks and stones so Sprout won't ever break his bones.",
                        "NextIndex": 5,
                        "Name": "Sticks and Stone Something Something Bones..."
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up some space so I can give you a best friend gift!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Now those meanie-bo-beanie stick monsters are making fun me for having a stick and rock collection! But I won't give up I have a super idea!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "If you can beat them up in your underwear they'll be too embarassed to make fun of anyone! QUEST: Defeat stick monsters with no clothes equipped just a weapon.",
                        "NextIndex": 8,
                        "Name": "Justice Wears No Clothes"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up some space so I can give you a best friend gift!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Victoryyyy! Now I can go to the treetops to get my frisbee just gotta take it one step at a... <br> WAIT OH NO OH NO OH NO!!! WHERE DID MY LEGS GO??!? Oh right I never had legs hahaha!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well daddy once told me that sometimes bodies grow because of what's around them. Maybe if I put shoes on my body would grow legs and feet to fill them? <br> QUEST:Get a bunch of shoes for Sprout to try on.",
                        "NextIndex": 11,
                        "Name": "Shoe Shopping with Sprout"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up some space so I can give you a best friend gift!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "This is not working!! But at least I look super awesome I think I'll keep wearing these shoes! Here you can have my Merry Cherry Remedy Tshirt they broke up when I was a sapling and they'll never ever come back ever.",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hi! Are you ok? <br> Oh right! The frisbee... can you get me my frisbee by yourself? Pretty please? <br> QUEST:Get the frisbee back from the top of this tree.",
                        "NextIndex": 14,
                        "Name": "Frisbee Fanatic"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up some space so I can give you a best friend gift!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh darn! The frisbee must have gotten shrunk down by a magic apple! I saw it happen in this cartoon once so I bet you that's what happened!! Anyway you can keep it I dont want it anymore.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hahaha I sure do love bobbin' up and down!! It's a flower thing you wouldn't get it!!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Town Marble", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 7.1,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Wilson",
                    "notes": "[[Town Marble]] is found in the [[Worlds#G1 - Blunder Hills|starting town]], located in the top section of the area.$NEWLINE$$NEWLINE$Upon completing his quest the player is awarded with the ability to deposit [[File:Power_Statue.png|36px]] [[Statues]] for character-specific upgrades.$NEWLINE$"
                },
                "quests": {
                    "Visualizing the Sculpture Within...": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Could you be the one to craft me into the formation I was destined to asssume? <br> QUEST:Sculpt this marble into a statue worthy of the gods.",
                        "NextIndex": 3,
                        "Name": "Visualizing the Sculpture Within...",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "EquipmentStatues1", "quantity": 1}],
                        "QuestName": "Town Marble1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": "Purchase Sculpting Tools from the town shop. This quest is not account-wide."},
                        "ItemReq": [<ComponentModel>{"item": "SmithingHammerChisel", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Forsooth this town hath bequeathed unto me yet another philistine not worthy of laying so much as a fiddlestick upon my divine surface!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "But hark what be this I see? Mayhaps a glimmer of hope through yonder eyeball breaks upon which mine surface doth reflect?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Could you be the one to craft me into the formation I was destined to asssume? <br> QUEST:Sculpt this marble into a statue worthy of the gods.",
                        "NextIndex": 3,
                        "Name": "Visualizing the Sculpture Within..."
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aha! Now all shall bear witness to ultimate perfection! Please do return with any other statues you may come across on your journey so that they too may bask in my greatness!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Obol Altar", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Encroaching Forest Villas, YumYum Grotto",
                    "world": "Blunder Hills, Yum-Yum Desert",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 9.07,
                    "starSign": "Gemini",
                    "mothersMaidenName": "Lee",
                    "notes": "The [[Obol Altar]] appears in both [[Worlds#F2 - Encroaching Forest Villas|Encroaching Forest Villas]] and [[Worlds#D0 - YumYum Grotto|YumYum Grotto]].$NEWLINE$$NEWLINE$The Obol Altar offers three tabs for Obols and one summary page. In the first tab, Obols only affect the current character and slots are unlocked based on the level of the specific character. In the second tab, Obols affect all characters and slots are unlocked based on the total level of all characters you have. In the third tab, you can reroll obol stats, combine obols and scrap obols to turn them into fragments. And finally, in the fourth tab you can see the total bonuses from all your equipped obols.$NEWLINE$$NEWLINE$To access the Obol Altar, one must defeat Amarok at least once and complete the quest 'Bad Kitty, get off that altar!' on any character. The altar will then become available to all the remaining characters of that account.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Bad Kitty, get off that altar!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... meow... Zzz... <br> QUEST:Find something to scare the cat off the Obol Altar",
                        "NextIndex": 2,
                        "Name": "Bad Kitty, get off that altar!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "ObolBronzeDamage", "quantity": 1}],
                        "QuestName": "Obol Altar1",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "BobJoePickle", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Zzz... Zzz... meow meow meow... <br> meeeeow... Zzz...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... meow... Zzz... <br> QUEST:Find something to scare the cat off the Obol Altar",
                        "NextIndex": 2,
                        "Name": "Bad Kitty, get off that altar!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "MROWW! 'The cat jumps off in fear of the pickle. What a silly cat getting scared of a little pickl-- OH MY GOD THE PICKLE HAS EYEBALLS AAAAAH KILL IT KILL IT!!!'",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Woodsman", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Spore Meadows",
                    "world": "Blunder Hills",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 9.32,
                    "starSign": "Leo",
                    "mothersMaidenName": "Thompson",
                    "notes": "The [[Woodsman]] is found in [[Worlds#G2 - Spore Meadows|Spore Meadows]], the first zone to the right of the starting town, located next to an oak tree with a stump next to him.$NEWLINE$$NEWLINE$His quests focus on improving the player's capabilities in the [[File:Choppin Skill Icon.png]] [[Choppin]] Skill. $NEWLINE$$NEWLINE$His final quest awards the {{CraftReq|Woodsman Token}}.$NEWLINE$"
                },
                "quests": {
                    "A noob's first swing": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Care to give it a try? I'd do it myself but I wouldn't want to embarass a beginner like you! <br> QUEST:Chop down that Tree and collect 10 Oak Logs!",
                        "NextIndex": 4,
                        "Name": "A noob's first swing",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "MaxCapBagT1", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 30},
                            <CoinRewardModel>{"item": "", "quantity": 100}
                        ],
                        "QuestName": "Woodsman1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "OakTree", "quantity": 10}]
                    },
                    "A noob's 2nd first swing": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "See how your tree over there is a tree and mine here is... well not a tree anymore? Please make yours a bit more like mine. <br> QUEST:Turn the tree into the absence of a tree and get 100 Oak Logs.",
                        "NextIndex": 7,
                        "Name": "A noob's 2nd first swing",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "EquipmentToolsHatchet0", "quantity": 1}, <CoinRewardModel>{"item": "", "quantity": 200}],
                        "QuestName": "Woodsman2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "OakTree", "quantity": 100}]
                    },
                    "It's Just a Plank, Bro!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hit tree with sharp hammer. Make gravity in tree go brrrr. <br> QUEST:Bring 1000 logs... you should come back to this quest later once you have a higher Log Carry Capacity!",
                        "NextIndex": 10,
                        "Name": "It's Just a Plank, Bro!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 9,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentHats4Choppin", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 500}
                        ],
                        "QuestName": "Woodsman3",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "OakTree", "quantity": 1000}]
                    },
                    "Exotic Pranks... I mean Logs!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Actually before you take off can ya get me some exotic logs? If you get a MASSIVE highscore in the minigame rare logs will come out! Go on try getting one! <br> QUEST: Get a Forest Log by earning a choppin' highscore of 150!",
                        "NextIndex": 14,
                        "Name": "Exotic Pranks... I mean Logs!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken5", "quantity": 1}, <ExpRewardModel>{"item": "Experience3", "quantity": 1000}],
                        "QuestName": "Woodsman4",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "ForestTree", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ho traveller great day for choppin wouldn't you say?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I just felled this tree beside me! Looked to be a tough job at first but it was all bark and no bite... That tree over there though has got me stumped!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Care to give it a try? I'd do it myself but I wouldn't want to embarass a beginner like you! <br> QUEST:Chop down that Tree and collect 10 Oak Logs!",
                        "NextIndex": 4,
                        "Name": "A noob's first swing"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hmm you've got a full inventory! Clear up 2 spaces so I can reward you!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Thanks for the logs but I may have to explain the premise of chopping down a tree a bit more clearly next time.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "See how your tree over there is a tree and mine here is... well not a tree anymore? Please make yours a bit more like mine. <br> QUEST:Turn the tree into the absence of a tree and get 100 Oak Logs.",
                        "NextIndex": 7,
                        "Name": "A noob's 2nd first swing"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "How am I meant to give you these cool items as reward when you dont have 2 inventory spaces to put them in?",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "I don't need any more logs my boy I just want to see that tree fall down! Why don't you come on back later lad maybe you'll understand me better then. <br> Return at Choppin Lv. 10",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hit tree with sharp hammer. Make gravity in tree go brrrr. <br> QUEST:Bring 1000 logs... you should come back to this quest later once you have a higher Log Carry Capacity!",
                        "NextIndex": 10,
                        "Name": "It's Just a Plank, Bro!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I give you reward but you no have space! One two three space you need!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hahahaha you should've seen your face! You can't chop down trees in this game it was just a prank my boy! <br> This stump here? It's just a prop! Here take my spare prop as a gift for being such a good sport!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hope the hat fits! I've got a few more gags but those will have to wait!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Actually before you take off can ya get me some exotic logs? If you get a MASSIVE highscore in the minigame rare logs will come out! Go on try getting one! <br> QUEST: Get a Forest Log by earning a choppin' highscore of 150!",
                        "NextIndex": 14,
                        "Name": "Exotic Pranks... I mean Logs!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I give you reward but you no have space! One two three space you need!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hahahaha did I getcha again my boy? Ah don't take it too hard you don't need to pretend that I didn't fool ya we all know I did #",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Scripticus", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 12,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.54,
                    "starSign": "Pisces",
                    "mothersMaidenName": "Garcia",
                    "notes": "[[Scripticus]] is the first NPC you interact with after the tutorial, located to the right in the [[Worlds#G1 - Blunder Hills|starting town]].$NEWLINE$$NEWLINE$He introduces the player to the basics of completing quests, fighting monsters, [[Smithing]], equipping gear, and creating multiple characters. His questline guides the player through most of World 1 leading to the [[Amarok]] boss fight.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Hardcore Gamer Status, Here I Come!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Speaking of quests I'm the main quest giver and here comes your first mission! <br> MAIN QUEST:Go to the right and defeat 5 green spores.",
                        "NextIndex": 8,
                        "Name": "Hardcore Gamer Status, Here I Come!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <ComponentModel>{"item": "CraftMat2", "quantity": 1},
                            <CoinRewardModel>{"item": "", "quantity": 100},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 10}
                        ],
                        "QuestName": "Scripticus2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Scripticus2",
                        "CustomArray": [<CustomReqModel>{"desc": "Defeat Green Spores:", "finalV": 5, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Gear Up, Gamer!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Let's get you a better weapon those bare fists can only slap so hard! Try making some boxing gloves over at the anvil!  <br> MAIN QUEST:Buy some Tape from the Shop and then make some gloves",
                        "NextIndex": 11,
                        "Name": "Gear Up, Gamer!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentHats7", "quantity": 1},
                            <CoinRewardModel>{"item": "", "quantity": 150},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 15}
                        ],
                        "QuestName": "Scripticus3",
                        "Difficulty": 1,
                        "note": <NoteModel>{
                            "note": "If you've accidentally sold the {{CraftReq|Crimson String}}, you can reclaim it from the quest codex."
                        },
                        "CustomType": "Scripticus3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Craft Boxing Gloves:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Buy Tape from Shop:", "finalV": 5, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Mr. Worldwide": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Now lets find you some tougher monsters! Defeat enough spores to unlock the next map. Can't have a promising player like you stuck in one place! <br> MAIN QUEST:Reach map 2",
                        "NextIndex": 15,
                        "Name": "Mr. Worldwide",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 14,
                        "Rewards": [
                            <ComponentModel>{"item": "InvBag1", "quantity": 1},
                            <ComponentModel>{"item": "FoodHealth1", "quantity": 20},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 25}
                        ],
                        "QuestName": "Scripticus4",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": " Map 2 is the third Grasslands zone, [[Worlds#G3 - Froggy Fields|Froggy Fields]]."
                        },
                        "CustomType": "Scripticus4",
                        "CustomArray": [<CustomReqModel>{"desc": "Discover map 2:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Choice is Yours!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Did you get all of that? I'll add a Hint to your codex about Talent Points if you ever forget. Now go spend those points! <br> MAIN QUEST:Spend 5 Talent Points",
                        "NextIndex": 19,
                        "Name": "The Choice is Yours!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 18,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy1", "quantity": 2},
                            <CoinRewardModel>{"item": "", "quantity": 280},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 20}
                        ],
                        "QuestName": "Scripticus5",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Scripticus5",
                        "CustomArray": [<CustomReqModel>{"desc": "Spend Talent Points:", "finalV": 5, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Certified Swinger, of Pickaxes of course!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go check out that portal on the left. There's a cheerful goblin who will show you some new gameplay! I haven't actually seen him in a while but I bet he is as happy as I remember!  <br> MAIN QUEST:Get Glumlee's Certification. He's in the Left Portal!",
                        "NextIndex": 22,
                        "Name": "Certified Swinger, of Pickaxes of course!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 21,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentTools1", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience1", "quantity": 50},
                            <CoinRewardModel>{"item": "", "quantity": 200}
                        ],
                        "QuestName": "Scripticus6",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Quest1", "quantity": 1}]
                    },
                    "The Smithing Grind": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Now then use what you learned to get the materials needed to craft some new Equipment at the Anvil! Go do that while I go get this certificate framed... or maybe I should get it laminated...  <br> MAIN QUEST:Craft Farmer Brim and Orange Tee",
                        "NextIndex": 51,
                        "Name": "The Smithing Grind",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 26,
                        "Rewards": [
                            <ComponentModel>{"item": "MaxCapBagM1", "quantity": 1},
                            <RecipeRewardModel>{"item": "SmithingRecipes1", "quantity": 36},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 200}
                        ],
                        "QuestName": "Scripticus7",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "Crafting the required items before accepting the quest will not reward the player with completion progress."
                        },
                        "CustomType": "Scripticus7",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Farmer Brim Crafted:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Orange Tee Crafted:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "The Unoccupied Picnic": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I went for a Picnic the other day out in the Frog Fields and I forgot to bring home the basket! There wasn't much in there other than a jar of Golden Jam that I need back!  <br> MAIN QUEST:Retrieve the Golden Jam",
                        "NextIndex": 27,
                        "Name": "The Unoccupied Picnic",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 50,
                        "Rewards": [
                            <ComponentModel>{"item": "InvBag2", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 120},
                            <CoinRewardModel>{"item": "", "quantity": 300}
                        ],
                        "QuestName": "Scripticus8",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "There are '''TWO''' {{CraftReq|Golden Jam}} items. You want the {{CraftReq|Golden Jam (Quest)}} item for this."
                        },
                        "ItemReq": [<ComponentModel>{"item": "Quest5", "quantity": 1}]
                    },
                    "Stiltzcho, the Leaf Scout": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Anyway he's our best bet at finding out who stole the Town Gem! <br> QUEST:Get a scouting report from Stiltzcho the Leaf NPC in the slime map after beans!",
                        "NextIndex": 35,
                        "Name": "Stiltzcho, the Leaf Scout",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 34,
                        "Rewards": [
                            <ComponentModel>{"item": "InvBag3", "quantity": 1},
                            <ComponentModel>{"item": "MaxCapBagM3", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 1250}
                        ],
                        "QuestName": "Scripticus9",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest6", "quantity": 1}]
                    },
                    "What Lies at the Heart of the Forest": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But you've come a long way since that epic fall from gamer grace so why don't you go check it out for yourself? Come back when you know more about the place! <br> MAIN QUEST:Reach the Forest Camp past the Carrotmen and Glublins!",
                        "NextIndex": 41,
                        "Name": "What Lies at the Heart of the Forest",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 40,
                        "Rewards": [
                            <ComponentModel>{"item": "rtt0", "quantity": 10},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 2},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 2500}
                        ],
                        "QuestName": "Scripticus10",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "The 'Forest Camp' is the second area of the forest, where you can find the entrance to the [[Amarok]] boss fight."
                        },
                        "CustomType": "Scripticus10",
                        "CustomArray": [<CustomReqModel>{"desc": "Forest Camp Found:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Bigger they are, the Bigger they Fall!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well it's all up to you now! Go defeat that thief and take back our Town Crystal! <br> MAIN QUEST: Defeat Amarok the wolf golem who awaits you in the map to the right of the tiki villagers.",
                        "NextIndex": 44,
                        "Name": "The Bigger they are, the Bigger they Fall!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 43,
                        "Rewards": [
                            <TalentRewardModel>{"item": "TalentBook1", "quantity": 362050},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 5000},
                            <CoinRewardModel>{"item": "", "quantity": 4000}
                        ],
                        "QuestName": "Scripticus11",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "[[Amarok|The boss]] is located to the far right in [[Worlds#F2 - Encroaching Forest Villas|Encroaching Forest Villas]]. You need to complete [[Dog Bone (NPC)|Dog Bone]]'s quest to get the keys required to enter the [[Amarok|boss]] zone."
                        },
                        "CustomType": "Scripticus11",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Wolf Golem Defeated:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Town Gem Recovered:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Champion of the Grasslands": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go make me the 3 Blunderhill Tokens of Completion and you can have my Blunder Hero Trophy! Here's the token recipes. You'll find all their ingredients just from doing everything that this World has to offer!",
                        "NextIndex": 49,
                        "Name": "Champion of the Grasslands",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 48,
                        "Rewards": [<ComponentModel>{"item": "Trophy6", "quantity": 1}],
                        "QuestName": "Scripticus12",
                        "Difficulty": 9,
                        "note": <NoteModel>{
                            "note": "The Scripticus gives you all the 3 recipes for the tokens and also the 3 recipes which are needed to craft the [[Blunderhills NPC Completion Token]] ([[Easy Blunderhills NPC Token|Easy]], [[Med Blunderhills NPC Token|Med]], [[Hard Blunderhills NPC Token|Hard]])"
                        },
                        "ItemReq": [
                            <ComponentModel>{"item": "BadgeG1", "quantity": 1},
                            <ComponentModel>{"item": "BadgeG2", "quantity": 1},
                            <ComponentModel>{"item": "BadgeG3", "quantity": 1}
                        ]
                    },
                    "Can't somebody else do it?": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "No real gamer does everything for themself! Go create a 2nd character! QUEST:Reach Lv 5 then create a 2nd character! Use them to gather materials for you while you play on your main character!!",
                        "NextIndex": 54,
                        "Name": "Can't somebody else do it?",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 53,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneA1", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy1", "quantity": 2},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 150}
                        ],
                        "QuestName": "Scripticus13",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Scripticus13",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Swap to 2nd Character:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Storage Chest Used:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah another poor soul to add to the list!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "List of what you ask? Just look around you! The grassy platforms the slow-moving clouds the fact that the main NPC is a giant piece of paper...",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're the latest entry in the list of Nooby Gamers!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I know this must still be a shock for you since only a moment ago you were a Massive Legend Gamer on their way to beating up the final boss.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Actually there is one thing that might turn you back into a Pro Gamer! Now stand back as I utter the magic words...         <br>                 <br> Git Gud.",
                        "NextIndex": 5,
                        "Name": "The Journey Begins!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hahaha I had to do it to ya! <br> There's no shortcut back to the top. You're gonna have to level up craft armor master Skills fight bosses and complete hundreds of quests before you become a legend again!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Speaking of quests I'm the main quest giver and here comes your first mission! <br> MAIN QUEST:Go to the right and defeat 5 green spores.",
                        "NextIndex": 8,
                        "Name": "Hardcore Gamer Status, Here I Come!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't enough inventory space buddy!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That was amazing! Those punches were incredible and your patience to sit there and not uninstall the game served you well!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Let's get you a better weapon those bare fists can only slap so hard! Try making some boxing gloves over at the anvil!  <br> MAIN QUEST:Buy some Tape from the Shop and then make some gloves",
                        "NextIndex": 11,
                        "Name": "Gear Up, Gamer!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't enough inventory space buddy!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Drag those gloves to the grey sword outline to equip them! I also gave you a stylin' headband which you can also equip onto the helmet slot.",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Once you equip that Red Headband you'll be looking like a real street fighter! Or like some sort of 'grass-platform' fighter at least!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Now lets find you some tougher monsters! Defeat enough spores to unlock the next map. Can't have a promising player like you stuck in one place! <br> MAIN QUEST:Reach map 2",
                        "NextIndex": 15,
                        "Name": "Mr. Worldwide"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't enough inventory space buddy! Clear 3 spaces for your rewards.",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You seem a bit beat up! I forgot to tell you monsters get real tough real quick around here -- lemme show you something that might help.",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You get 3 talent points every time you level up your Class Level. You also get 1 talent point every time you level up a skill that you specialize in. There are also special STAR talents to collect which use separate talent points!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Did you get all of that? I'll add a Hint to your codex about Talent Points if you ever forget. Now go spend those points! <br> MAIN QUEST:Spend 5 Talent Points",
                        "NextIndex": 19,
                        "Name": "The Choice is Yours!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've got a full inventory and you're gonna want to make room for this book I'm about to give you!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh... wow. Those were uhh interesting choices. I think you're gonna need some more power to have a fighting chance against those froggies.",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go check out that portal on the left. There's a cheerful goblin who will show you some new gameplay! I haven't actually seen him in a while but I bet he is as happy as I remember!  <br> MAIN QUEST:Get Glumlee's Certification. He's in the Left Portal!",
                        "NextIndex": 22,
                        "Name": "Certified Swinger, of Pickaxes of course!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up some space so I can reward you!",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great I'll go ahead and take that! I've been trying to pass his class for 3 years but I'm literally incapable of doing anything other than wiggling around and talking so I always fail his tests.",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Now then use what you learned to get the materials needed to craft some new Equipment at the Anvil! Go do that while I go get this certificate framed... or maybe I should get it laminated...  <br> MAIN QUEST:Craft Farmer Brim and Orange Tee",
                        "NextIndex": 51,
                        "Name": "The Smithing Grind"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "All suited up and ready for the next quest eh? Alright! Wait no actually not alright. I need to go run some errands first. Tell you what why don't you help me with them?",
                        "NextIndex": 25,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I went for a Picnic the other day out in the Frog Fields and I forgot to bring home the basket! There wasn't much in there other than a jar of Golden Jam that I need back!  <br> MAIN QUEST:Retrieve the Golden Jam",
                        "NextIndex": 27,
                        "Name": "The Unoccupied Picnic"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've got a full inventory player sort out 2 spaces so I can give you your reward!",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh boy I can't wait to have me some of this golden jam!          'Scripticus opens the fake jar filled with springs'             <br> BWAH! WHAT THE WHAT??",
                        "NextIndex": 28,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I guess you could say that jam...                           <br> ...was a scam! Hahahaha! A bad pun is what you get for pullin' that prank. Alright lets just quickly move on and forget that just happened...",
                        "NextIndex": 29,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I think it's time we get real here gamer. Remember how you got absolutely owned by that griefer in World 4 and fell all the way down here?",
                        "NextIndex": 30,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You may not remember this but when you hit the ground you knocked off the Orange Gem powering the town's portal! If we're gonna get you back to being a Top Gamer that crystal needs to be returned!",
                        "NextIndex": 31,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm not sure who or what stole it but they sure aren't around here anymore. But I know someone who can help. There's an ex-town member who went to live out in the jungle his name is Silico... no wait was it Skullco?",
                        "NextIndex": 32,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I... actually dont remember his name. He did tell me once but I couldn't understand his accent and I'm too embarased to ask.",
                        "NextIndex": 33,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Anyway he's our best bet at finding out who stole the Town Gem! <br> QUEST:Get a scouting report from Stiltzcho the Leaf NPC in the slime map after beans!",
                        "NextIndex": 35,
                        "Name": "Stiltzcho, the Leaf Scout"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 2 more inventory space to get the rewards!",
                        "NextIndex": 33,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Perfect and you even got a signature! Now then what is his name... Smmffephhzcho? Oh come on his name is smudged!",
                        "NextIndex": 36,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh well at least Smmffephhzcho did a good job with the report. According to his findings you'll need to go into the Encroaching Forest several maps past the Jungle.",
                        "NextIndex": 38,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Whoopsies!",
                        "NextIndex": 38,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I've never actually been that far away from town... In fact no one here has and I don't think any of them are about to change that!",
                        "NextIndex": 39,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But you've come a long way since that epic fall from gamer grace so why don't you go check it out for yourself? Come back when you know more about the place! <br> MAIN QUEST:Reach the Forest Camp past the Carrotmen and Glublins!",
                        "NextIndex": 41,
                        "Name": "What Lies at the Heart of the Forest"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 2 more inventory space to get the rewards!",
                        "NextIndex": 39,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Forest villagers have the gem thief locked up and are using it as a tourist attraction? That's uh... oddly convenient. I guess that's what happens when a developer tries to put context behind a QoL feature haha.",
                        "NextIndex": 42,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well it's all up to you now! Go defeat that thief and take back our Town Crystal! <br> MAIN QUEST: Defeat Amarok the wolf golem who awaits you in the map to the right of the tiki villagers.",
                        "NextIndex": 44,
                        "Name": "The Bigger they are, the Bigger they Fall!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more inventory space to get the rewards!",
                        "NextIndex": 42,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Lets goooo!!! Just tap on our Builder Bird to restore power to the portal. Finally I can start sending letters to all my relatives in the other worlds! I can't wait to tell them how epic I was at teaching you everything you know!",
                        "NextIndex": 45,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Of course there's still plenty for you to do around here in Blunder Hills if you get bored! So many NPCs to help cards to collect tasks to complete...",
                        "NextIndex": 46,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "In fact there are so many things left to do that I'm willing to put my most prized posession on the line that you'll never be able to do everything!",
                        "NextIndex": 47,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go make me the 3 Blunderhill Tokens of Completion and you can have my Blunder Hero Trophy! Here's the token recipes. You'll find all their ingredients just from doing everything that this World has to offer!",
                        "NextIndex": 49,
                        "Name": "Champion of the Grasslands"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wow you seriously did all of that? Here's my tro... wait you don't have any inventory space! I guess that means you have to do EVERYTHING AGAIN HAHAHA!!! <br> Nah just kidding clear a space and talk to me again.",
                        "NextIndex": 47,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wow I never thought someone would care enough about the first world to do everything! It feels like just yesterday I signed you up into the Game's Database... to think I'm now giving you the highest honor in all of Blunder Hills! You're one heckin' sick gamer wear this trophy with pride!",
                        "NextIndex": 55,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've got a full inventory player sort out 2 spaces so I can give you your reward!",
                        "NextIndex": 25,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait... did you just gather all those materials YOURSELF? When you could've just gotten someone else to do it for you?",
                        "NextIndex": 52,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "No real gamer does everything for themself! Go create a 2nd character! QUEST:Reach Lv 5 then create a 2nd character! Use them to gather materials for you while you play on your main character!!",
                        "NextIndex": 54,
                        "Name": "Can't somebody else do it?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Your bags full clear up 1 space!",
                        "NextIndex": 52,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "See now you can do two things at once and share the items between the characters using that Storage Chest! Also here's an upgrade stone for one of the equips you crafted earlier!",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wow I never thought someone would care enough about the first world to do everything! It feels like just yesterday I found you unconscious at 1 hp and took some of your money... to think I'm now giving you the highest honor in the land! You're one heckin' sick gamer wear this trophy with pride!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Krunk", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Freefall Caverns",
                    "world": "Blunder Hills",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 9.31,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Thomas",
                    "notes": "[[Krunk]] is found in [[Worlds#M2 - Freefall Caverns|Freefall Caverns]], the second zone of the mines, located at the bottom of the area.$NEWLINE$$NEWLINE$Finishing his questline will unlock a shortcut to the gold ore within [[Worlds#M2 - Freefall Caverns|Freefall Caverns]], but only for characters that have completed the questline.$NEWLINE$$NEWLINE$You must complete all three of his quests and talk to him after reaching [[Mining]] Level 25 in order to receive the {{CraftReq|Krunk Token}}, which falls on the ground. He does say Level 33 at first but then changes his mind and gives it to you early.$NEWLINE$"
                },
                "quests": {
                    "A Plot to be Perfect": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If only I could achieve such form. Hey human could you get me some ingredients? I've got an idea. <br> QUEST:Get Krunk some things that will probably not explode when mixed.",
                        "NextIndex": 3,
                        "Name": "A Plot to be Perfect",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 4,
                        "NoSpaceIndex": 2,
                        "Rewards": [
                            <ComponentModel>{"item": "FoodMining1", "quantity": 200},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 500},
                            <ExpRewardModel>{"item": "Experience1", "quantity": 400}
                        ],
                        "QuestName": "Krunk1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Iron", "quantity": 200}, <ComponentModel>{"item": "FoodPotMana1", "quantity": 50}]
                    },
                    "The Scientific Method, According to a Rock": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If I am to achieve total substantiative infusion I'll have to use more sophisticated words so I seem smart enough to bend reality to do my bidding! Fetcheth unto me thine most precious of materials! <br> QUEST:He want's shiny things.",
                        "NextIndex": 6,
                        "Name": "The Scientific Method, According to a Rock",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 5,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneA1b", "quantity": 5},
                            <ComponentModel>{"item": "InvStorage3", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 1000}
                        ],
                        "QuestName": "Krunk2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [
                            <ComponentModel>{"item": "Gold", "quantity": 200},
                            <ComponentModel>{"item": "IronBar", "quantity": 100},
                            <ComponentModel>{"item": "EquipmentStatues1", "quantity": 20}
                        ]
                    },
                    "King of the Cavern": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well Bobby today sure is a fine day for some construction work I tell you hwat! Nothing beats the satisfaction of creating something with your own two hands 'specially something that also serves a useful purpose! <br> QUEST:Gather some construction materials for Hank... I mean Krunk.",
                        "NextIndex": 9,
                        "Name": "King of the Cavern",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 9,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentStatues2", "quantity": 2},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 1000}
                        ],
                        "QuestName": "Krunk3",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "You unlock a bridge at the top of the screen next to the portal that connects directly to the gold ores."
                        },
                        "ItemReq": [
                            <ComponentModel>{"item": "BirchTree", "quantity": 1200},
                            <ComponentModel>{"item": "CraftMat5", "quantity": 300},
                            <ComponentModel>{"item": "CraftMat1", "quantity": 600}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "This may be the most perfect specimen I've ever come across...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If only I could achieve such form. Hey human could you get me some ingredients? I've got an idea. <br> QUEST:Get Krunk some things that will probably not explode when mixed.",
                        "NextIndex": 3,
                        "Name": "A Plot to be Perfect"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've got a full inventory clear some space so I can give you the byproduct of my failed creation!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Interesting the viscosity of the mana potion prevented it from adhering to the smooth surface of the iron sample instead rendering it edible!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If I am to achieve total substantiative infusion I'll have to use more sophisticated words so I seem smart enough to bend reality to do my bidding! Fetcheth unto me thine most precious of materials! <br> QUEST:He want's shiny things.",
                        "NextIndex": 6,
                        "Name": "The Scientific Method, According to a Rock"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've got a full inventory clear some space so I can give you the byproduct of my failed creation!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "How curious the gilded particles of those precious metals broke down the structural integrity of the statue without mitigating its bonus giving qualities!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "However I am no closer to turning myself into diamond. My scholarly vocabulary has not aided the inventive process thus far so perhaps I must take a step back and be more simple minded...",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well Bobby today sure is a fine day for some construction work I tell you hwat! Nothing beats the satisfaction of creating something with your own two hands 'specially something that also serves a useful purpose! <br> QUEST:Gather some construction materials for Hank... I mean Krunk.",
                        "NextIndex": 9,
                        "Name": "King of the Cavern"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "There we have it now that's a sturdy bridge if ever I've seen one! ...well I wasn't expecting roleplaying as a hard-working propane salesman to help with my scientific pursuits! And it didnt! I guess I should just give up I have no other ideas.",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Aha I've got an idea! Quick go buy 500000 gems from the Gem Store I can use them to alter the... <br> what's that? You'd uninstall if that was the actual quest? Alright give me a moment to think of an alternate plan... <br> Return at Mining Level 33",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've come at the right time player! I have devised the perfect strategy to rid me of this worthless rock body!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I need you to... <br> Hang on I'm getting a call from the game developer LavaFlame2... Hey how are you? ... Oh is that so? You haven't coded my final quest yet and you need me to stall them? I see sure I'll let them know.",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Sorry human but I actually need you to give me a moment to finalize my strategy. You know crunch the numbers one last time make sure I didn't forget to carry the two and all that. <br> Return at Mining Lv.20",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hold up human you're acting a bit over eager for my final quest! Look perfect science like this is no trifling thing... a 5 month wait since 'The Kablamo' happened back in November of last year isn't all that long considering the sophisticaion at hand!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You can have my token early if it means you'll get off my back for a while but do return when I am prepared for my final plan!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Glumlee", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Tunnels Entrance",
                    "world": "Blunder Hills",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 6.45,
                    "starSign": "Gemini",
                    "mothersMaidenName": "Thomas",
                    "notes": "[[Glumlee]] is located in the [[Worlds#M1 - Tunnels Entrance|Tunnels Entrance]] to the left of the [[Worlds#G1 - Blunder Hills|starting town]].$NEWLINE$$NEWLINE$His quests focus on introducing players to the [[File:Mining Skill Icon.png]] [[Mining]] Skill and smelting ores in the [[Forge]] to earn the [[Mining Certificate]] needed to complete the quest 'Get Glumlee's Certification' given by [[Scripticus]].$NEWLINE$$NEWLINE$His final quest awards the {{CraftReq|Glumlee Token}}.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Learning to Swing": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go mine some ores and read this while you do. Mining Efficiency is your main stat here. It is boosted by your STR stat as well as your Mining Power which comes from pickaxes and other equipment! <br> QUEST:Mine 2 Copper Ore",
                        "NextIndex": 5,
                        "Name": "Learning to Swing",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "OilBarrel4", "quantity": 1}, <ExpRewardModel>{"item": "Experience1", "quantity": 10}],
                        "QuestName": "Glumlee1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Copper", "quantity": 2}]
                    },
                    "Learning to Smelt": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Now go to that forge and drag the ores into the 1st slot. Also drag the Oil Barrel I gave you into the 2nd slot. It'll speed things up. QUEST:Smelt a Copper Bar",
                        "NextIndex": 8,
                        "Name": "Learning to Smelt",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "OilBarrel1", "quantity": 10}, <ExpRewardModel>{"item": "Experience1", "quantity": 20}],
                        "QuestName": "Glumlee2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "CopperBar", "quantity": 1}]
                    },
                    "Literally Burning your Money": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Final task now. Go to the forge click the Yellow Arrow tab in the top right and buy some Upgrades. These are Permanent and are shared between all your characters.  <br> QUEST: Upgrade the forge 3 times",
                        "NextIndex": 11,
                        "Name": "Literally Burning your Money",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest1", "quantity": 1},
                            <ComponentModel>{"item": "MaxCapBagT2", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience1", "quantity": 15}
                        ],
                        "QuestName": "Glumlee3",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Glumlee3",
                        "CustomArray": [<CustomReqModel>{"desc": "Upgrades Bought:", "finalV": 2, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Impossible Task": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... that would've gone better on grass. Can you get that for me? I've kinda got my hands full. <br> QUEST: Pick up the microphone. Good luck you'll need it...",
                        "NextIndex": 19,
                        "Name": "The Impossible Task",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 18,
                        "Rewards": [
                            <TalentRewardModel>{"item": "TalentBook1", "quantity": 362640},
                            <ExpRewardModel>{"item": "Experience1", "quantity": 250}
                        ],
                        "QuestName": "Glumlee4",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Quest16", "quantity": 1}]
                    },
                    "He's Havin' a Bad Day": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... <br> QUEST:Yea he dropped it again... you know what to do.",
                        "NextIndex": 26,
                        "Name": "He's Havin' a Bad Day",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 25,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken6", "quantity": 1}, <ExpRewardModel>{"item": "Experience1", "quantity": 1000}],
                        "QuestName": "Glumlee5",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Quest16", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Uuugh... another one? Are you here to 'learn new gameplay' or whatever rubbish all the others keep saying?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Lets be honest this is all super obvious stuff... I mean it's just mining right?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WRONG! There is so much to mining! Mining efficiency power STR accuracy multi-ore mining we have a lot to cover!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go mine some ores and read this while you do. Mining Efficiency is your main stat here. It is boosted by your STR stat as well as your Mining Power which comes from pickaxes and other equipment! <br> QUEST:Mine 2 Copper Ore",
                        "NextIndex": 5,
                        "Name": "Learning to Swing"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "We aren't even one step through my mining clas and you've already got a full inventory. Please clear up some space.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You can actually see your accuracy. Tap MENU then AFK INFO then look at the bar in the bottom left!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Now go to that forge and drag the ores into the 1st slot. Also drag the Oil Barrel I gave you into the 2nd slot. It'll speed things up. QUEST:Smelt a Copper Bar",
                        "NextIndex": 8,
                        "Name": "Learning to Smelt"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Uh... you're inventory is full. Please clear 1 slot and come back!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Smelting bars uses multiple ores. Later bars like Iron and Gold will require more Ores per Bar. Tap on Ore in your inventory to see the exact numbers!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Final task now. Go to the forge click the Yellow Arrow tab in the top right and buy some Upgrades. These are Permanent and are shared between all your characters.  <br> QUEST: Upgrade the forge 3 times",
                        "NextIndex": 11,
                        "Name": "Literally Burning your Money"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have no inventory space for the certificate. Clear up some space so you can get this worthless piece of paper!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well that's it. Now you know how to get all the resources mining has to offer. I'm actually pretty pleased with how you did I'm glad you paid attention and didn't skip through my dialogue instantly like everyone else does!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "In fact why don't you come back once you've gotten a bit more experienced? I'm more than just a pouty goblin with a repeating 5 frame animation!!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "... because I actually have 6 frames! The part about me being pouty was true. <br> Well? Go on get more experienced and come back! <br> Return at Mining Lv.11",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Alright kid or man or baby whatever you are behind that screen I'm gonna let you in on a secret.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You ever notice how I never leave this map not even to level up my Class Level from fighting monsters? Well there's a reason...",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I get class exp from mining. <br> Boom mic drop.",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... that would've gone better on grass. Can you get that for me? I've kinda got my hands full. <br> QUEST: Pick up the microphone. Good luck you'll need it...",
                        "NextIndex": 19,
                        "Name": "The Impossible Task"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're going to want 1 inventory space to accept this Star Book I'm about to give you. Go clear some space!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Go ahead and use that Star Book I just gave you. It's very important for you Skiller type characters! Come talk to me after you do and I'll explain it.",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Basically you can now choose a skill to also give you Class EXP. This way you can focus on skilling while still leveling up so you won't miss out on all the Talent Points you get from leveling up your Class.",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You can change your mind as often as you want but remember that the Class EXP you get comes from your Skill EXP so you will get a bit less Skilling EXP if you have this active.",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh and one more thi-- 'THUD'",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... ... ...",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... <br> QUEST:Yea he dropped it again... you know what to do.",
                        "NextIndex": 26,
                        "Name": "He's Havin' a Bad Day"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'll have quests later on that increase that Talent's max level above just 40 but those will be added in later.",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Uh thanks... anyway I'll have quests later on that increase that Talent's max level above just 40 but those will be added in later.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Picnic Stowaway", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Froggy Fields",
                    "world": "Blunder Hills",
                    "noQuest": 12,
                    "repeatable": "Daily",
                    "type": "",
                    "birthWeight": 3.7,
                    "starSign": "Libra",
                    "mothersMaidenName": "Jones",
                    "notes": "The [[Picnic Stowaway]] is found in [[Worlds#G3 - Froggy Fields|Froggy Fields]], the second zone of Grasslands, located in the bottom left of the area.$NEWLINE$$NEWLINE$After completing his first 3 quests, his following quests will be part of a quest chain that is limited by a daily reset. You can do the full daily questline once per character per reset, but whether you complete the full questline or not it will start over at the first quest in the chain (The Most Important Meal of the Day) after your daily reset.$NEWLINE$$NEWLINE$The Picnic Stowaway daily questline is the source of the [[Peanut]] Recipe, and completing the third quest in the chain is a possible daily [[Tasks#Blunder Hills|Task]]. $NEWLINE$$NEWLINE$Completing the full daily questline in a single day awards you one {{CraftReq|Picnic Token}}. In order to obtain the [[King of Food]] trophy, you must complete the full daily questline 30 times.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "The Hungry Stowaway": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well come on now I aint gonna give you part of my stash here for nothin'. This is a picnic basket not a charity house! Bring me something and maybe we can fix up a deal... <br> QUEST:Buy and bring 50 Nomwiches from the Town Shop.",
                        "NextIndex": 7,
                        "Name": "The Hungry Stowaway",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "MaxCapBag6", "quantity": 1}, <CoinRewardModel>{"item": "", "quantity": 300}],
                        "QuestName": "Picnic Stowaway1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "FoodHealth1", "quantity": 30}]
                    },
                    "Beating Up Frogs for some Sauce": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Why don't you go 'ask' the frogs around here for some Condiments. Those Fists of yours seem like persuasive talkers! I'll hold onto these nomwiches in the meantime... for safe keeping you know?",
                        "NextIndex": 10,
                        "Name": "Beating Up Frogs for some Sauce",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 9,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentPendant9", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 200}
                        ],
                        "QuestName": "Picnic Stowaway2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest3", "quantity": 3}, <ComponentModel>{"item": "Quest4", "quantity": 3}]
                    },
                    "Live-Action Entertainment": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "One... two... THREE!!! Oh and these monsters have Increased Damage watch out! If you fail you can forfeit and retry using the Codex!",
                        "NextIndex": 14,
                        "Name": "Live-Action Entertainment",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest5", "quantity": 1},
                            <ComponentModel>{"item": "FoodG1", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 150}
                        ],
                        "QuestName": "Picnic Stowaway3",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Picnic Stowaway3",
                        "CustomArray": [<CustomReqModel>{"desc": "Mushrooms Defeated:", "finalV": 10, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Most Important Meal of the Day": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Have you heard the story of Green Legs and Ham? The kid in the story didn't like green legs and ham but I wanna judge it for myself. <br> QUEST:Get frog legs and bean slices",
                        "NextIndex": 23,
                        "Name": "The Most Important Meal of the Day",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 22,
                        "Rewards": [<ComponentModel>{"item": "FoodG1", "quantity": 1}, <ComponentModel>{"item": "FoodPotRe2", "quantity": 25}],
                        "QuestName": "Picnic Stowaway4",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": "Daily Quest"},
                        "ItemReq": [<ComponentModel>{"item": "Grasslands2", "quantity": 200}, <ComponentModel>{"item": "Grasslands3", "quantity": 100}]
                    },
                    "Brunchin' with the Blobs": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "My blobulyte buddies are coming over in a bit I need some food for us to eat and decor for them to hide behind! <br> QUEST:Get some peanuts and foliage.",
                        "NextIndex": 26,
                        "Name": "Brunchin' with the Blobs",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 25,
                        "Rewards": [
                            <ComponentModel>{"item": "FoodG1", "quantity": 3},
                            <ComponentModel>{"item": "FoodPotGr2", "quantity": 50},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 1}
                        ],
                        "QuestName": "Picnic Stowaway5",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Daily Quest. The first time you start this quest, the recipe for the Peanut drops."
                        },
                        "ItemReq": [
                            <ComponentModel>{"item": "Peanut", "quantity": 100},
                            <ComponentModel>{"item": "BirchTree", "quantity": 1500},
                            <ComponentModel>{"item": "Leaf1", "quantity": 50}
                        ]
                    },
                    "Luncheon with the Inlaws": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I just wish I hadn't told my in-laws about that then maybe they wouldn't be joinin' me for lunch today. But I've got a plan to dip out hehehe... <br> QUEST:Help gather fake blobulyte materials",
                        "NextIndex": 29,
                        "Name": "Luncheon with the Inlaws",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 28,
                        "Rewards": [
                            <ComponentModel>{"item": "FoodG2", "quantity": 1},
                            <ComponentModel>{"item": "FoodG1", "quantity": 5},
                            <ComponentModel>{"item": "EquipmentStatues6", "quantity": 3}
                        ],
                        "QuestName": "Picnic Stowaway6",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Daily Quest. You must complete this quest for the 'Escapin' the 'Laws' daily [[Tasks|Task]]."
                        },
                        "ItemReq": [
                            <ComponentModel>{"item": "OilBarrel1", "quantity": 200},
                            <ComponentModel>{"item": "IronBar", "quantity": 100},
                            <ComponentModel>{"item": "SmithingHammerChisel", "quantity": 1}
                        ]
                    },
                    "Afternoon Tea in a Jiffy": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I could really go for a spot of tea but some jar of sand fell in love with my teacup the stupid thing! He took it and ran deep into the Jungle. <br> QUEST:Get the tea back before it gets cold!",
                        "NextIndex": 32,
                        "Name": "Afternoon Tea in a Jiffy",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 31,
                        "Rewards": [
                            <ComponentModel>{"item": "FoodG2", "quantity": 3},
                            <ComponentModel>{"item": "FoodG1", "quantity": 10},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 1}
                        ],
                        "QuestName": "Picnic Stowaway7",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Daily Quest. There is a [[Sandy Pot]] at [[Carrotman|Carrotmen]]. Kill it, pick up the teacup and run back to Picnic Stowaway."
                        },
                        "CustomType": "Picnic Stowaway7",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Teacup Retrieved:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Tea Temperature:", "finalV": 100, "type": "GreaterEqual", "startV": 300},
                            <CustomReqModel>{"desc": "Dont Teleport:", "finalV": 1, "type": "GreaterEqual", "startV": 1}
                        ]
                    },
                    "Early Evening Eating Endeavor": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'm feelin' hungry again why dont you go get some desert Kebabs? And get me a bowl too I can't eat them off the stick. <br> QUEST:Get baby here a little baby bowl because he can't eat kebabs like a big boy.",
                        "NextIndex": 35,
                        "Name": "Early Evening Eating Endeavor",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 34,
                        "Rewards": [
                            <ComponentModel>{"item": "FoodG2", "quantity": 10},
                            <ComponentModel>{"item": "FoodG1", "quantity": 20},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 2}
                        ],
                        "QuestName": "Picnic Stowaway8",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": "Daily Quest"},
                        "ItemReq": [<ComponentModel>{"item": "EquipmentHats18", "quantity": 1}, <ComponentModel>{"item": "FoodHealth6", "quantity": 500}]
                    },
                    "The Last Supper, at Least for Today!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But I love baloney so go get it for me! He also said something about it being a pretty rare drop? I dunno he's a bit of a rambler that one. <br> QUEST:Hope you read the previous dialogue!",
                        "NextIndex": 39,
                        "Name": "The Last Supper, at Least for Today!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 4,
                        "NoSpaceIndex": 38,
                        "Rewards": [
                            <ComponentModel>{"item": "FoodG3", "quantity": 1},
                            <ComponentModel>{"item": "FoodG2", "quantity": 20},
                            <TalentRewardModel>{"item": "TalentBook1", "quantity": 3619100}
                        ],
                        "QuestName": "Picnic Stowaway9",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": "Daily Quest"},
                        "ItemReq": [<ComponentModel>{"item": "Meatloaf", "quantity": 1}]
                    },
                    "Don't Desert the Dessert": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "It's getting kinda late eh? Gotta have me some dessert before I lose my appetite! I've heard of a fabled chocolate cake that for some reason drops from crabs holding vanilla cakes! <br> QUEST: Mmmmm nuget caaaaaakee....",
                        "NextIndex": 42,
                        "Name": "Don't Desert the Dessert",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 41,
                        "Rewards": [
                            <ComponentModel>{"item": "PremiumGem", "quantity": 1},
                            <ComponentModel>{"item": "FoodG3", "quantity": 5},
                            <ComponentModel>{"item": "StoneHelm6", "quantity": 2}
                        ],
                        "QuestName": "Picnic Stowaway10",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": "Daily Quest. Nuget Cakes drop from [[Crabcake|Crabcakes]]"},
                        "ItemReq": [<ComponentModel>{"item": "DesertA3b", "quantity": 2}]
                    },
                    "A Midnight Snack": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Actually I might need a snack if I wake during the night. I've seen some monsters in the Twilight Desert snackin' on some cookies so a few of those would be batchin'. <br> QUEST: Get rare cookie drops from Twilight Desert mobs.",
                        "NextIndex": 46,
                        "Name": "A Midnight Snack",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 45,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest9", "quantity": 1},
                            <ComponentModel>{"item": "FoodG3", "quantity": 10},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 3}
                        ],
                        "QuestName": "Picnic Stowaway11",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": "Daily Quest"},
                        "ItemReq": [<ComponentModel>{"item": "MidnightCookie", "quantity": 2}]
                    },
                    "King of Food": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But lets be real tokens are for suckers. If you want a big boy prize to show off to the world help me out for a whole month. <br> QUEST:Collect 30 Picnic tokens and you'll get a trophy!",
                        "NextIndex": 49,
                        "Name": "King of Food",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 48,
                        "Rewards": [<ComponentModel>{"item": "Trophy1", "quantity": 1}],
                        "QuestName": "Picnic Stowaway12",
                        "Difficulty": 8,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest9", "quantity": 30}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... ... ... ... ... ... ... ... ... ...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... what were you expecting a picnic basket to talk?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Crap did I just say that out loud...",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well don't just stand there ya goof you'll blow my cover! Now get lost this ain't your picnic and anyway there's not enough room in here for both of us!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What? The owner just wants their jam back and won't mind me staying here? Great! How about I don't give you the jam back and I still stay here!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well come on now I aint gonna give you part of my stash here for nothin'. This is a picnic basket not a charity house! Bring me something and maybe we can fix up a deal... <br> QUEST:Buy and bring 50 Nomwiches from the Town Shop.",
                        "NextIndex": 7,
                        "Name": "The Hungry Stowaway"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You call that an inventory? Even I couldn't fit in it! Clear up some space so I can give you your rewards.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well well well these don't look too bad! I think we can work out a trade right here right n--- wait where's the ketchup... or the mustard??",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Why don't you go 'ask' the frogs around here for some Condiments. Those Fists of yours seem like persuasive talkers! I'll hold onto these nomwiches in the meantime... for safe keeping you know?",
                        "NextIndex": 10,
                        "Name": "Beating Up Frogs for some Sauce"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You call that an inventory? Even I couldn't fit in it! Clear up some space so I can give you your rewards.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great these will do. Now all I need is something to watch while I'm eating! What were you expecting me to just look at the grass grow while I eat? I don't even think grass grows in this universe.",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I need something suspenseful exciting funny... a fight to the death should work! On the count of 3 I'll call in some mushrooms for you to destory!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "One... two... THREE!!! Oh and these monsters have Increased Damage watch out! If you fail you can forfeit and retry using the Codex!",
                        "NextIndex": 14,
                        "Name": "Live-Action Entertainment"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You won the fight! But you lost the 'have 2 open inventory spaces' war. Clear up your inventory so I can reward you!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That was amazing! Best meal I've had in ages. You can have this golden jam but I dont want ya just givin' it to some fool you're the one who helped me after all.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Thats why I've prepared a fake jam jar filled with springs! Give that one back instead and they'll be so embarassed by the prank that they'll try to move on from it rather than ask for the real jar!",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Come back again some time yea? This picnic basket is filled with golden foods that aint good for a fella like me and I'd be willin' to give em to ya at the right price.",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah my friend welcome back! I'm in a bit of a situation that needs explainin' if your willin' to listen.",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I just realized that I need to eat every single day! Go figure I thought I could just eat once and I'd be good for life.",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Every day I will have a series of quests to complete each one harder than the last! You can complete as many as you want but after 24 hours you will start back at the first quest! Think of this as a repeatable Daily Questline.",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well it's the start of a new day now so lets get on with breakfast!",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Have you heard the story of Green Legs and Ham? The kid in the story didn't like green legs and ham but I wanna judge it for myself. <br> QUEST:Get frog legs and bean slices",
                        "NextIndex": 23,
                        "Name": "The Most Important Meal of the Day"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Nom nom nom... eugh no wonder the kid dies of food poisoning this universe's version of the story those were terrible. Maybe they'll taste better tomorrow.",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "My blobulyte buddies are coming over in a bit I need some food for us to eat and decor for them to hide behind! <br> QUEST:Get some peanuts and foliage.",
                        "NextIndex": 26,
                        "Name": "Brunchin' with the Blobs"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Nothin' beats chillin' with the bros over some good food and especially when it's so roomy in here! I'm glad this is a Non Euclidean basket else it'd be cramped down in 'ere!",
                        "NextIndex": 27,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I just wish I hadn't told my in-laws about that then maybe they wouldn't be joinin' me for lunch today. But I've got a plan to dip out hehehe... <br> QUEST:Help gather fake blobulyte materials",
                        "NextIndex": 29,
                        "Name": "Luncheon with the Inlaws"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 27,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "It worked! I just poured the oil over a stack of bars and they couldn't even tell the difference! Kinda says a lot about what I look like but who cares right?",
                        "NextIndex": 30,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I could really go for a spot of tea but some jar of sand fell in love with my teacup the stupid thing! He took it and ran deep into the Jungle. <br> QUEST:Get the tea back before it gets cold!",
                        "NextIndex": 32,
                        "Name": "Afternoon Tea in a Jiffy"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 30,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Heh perfect. That pesky sand jar has been pining for my teacup ever since he saw some manga online about a sentient 500 year old teacup girl or something. Kids these days right??",
                        "NextIndex": 33,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'm feelin' hungry again why dont you go get some desert Kebabs? And get me a bowl too I can't eat them off the stick. <br> QUEST:Get baby here a little baby bowl because he can't eat kebabs like a big boy.",
                        "NextIndex": 35,
                        "Name": "Early Evening Eating Endeavor"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 33,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah cooked to perfection! I can't believe this stuff aint popular here in Blunder Hills it's the bomb! ... err I didn't mean it like that.",
                        "NextIndex": 36,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Dinner time! One of my blobmates was tellin' me about how some magic forest golem meatloaf. I gotta say sounded like a bunch of baloney.",
                        "NextIndex": 37,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But I love baloney so go get it for me! He also said something about it being a pretty rare drop? I dunno he's a bit of a rambler that one. <br> QUEST:Hope you read the previous dialogue!",
                        "NextIndex": 39,
                        "Name": "The Last Supper, at Least for Today!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 37,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Woah my friend wasn't kiddin! This is top stuff I should save some for my in-laws for the 'nom' next time 'nomnom' they 'nomnomnom' visit! Oops I accidentally ate it all hahaha!",
                        "NextIndex": 40,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "It's getting kinda late eh? Gotta have me some dessert before I lose my appetite! I've heard of a fabled chocolate cake that for some reason drops from crabs holding vanilla cakes! <br> QUEST: Mmmmm nuget caaaaaakee....",
                        "NextIndex": 42,
                        "Name": "Don't Desert the Dessert"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 40,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Can't believe I'm gonna say this but this is too much food for me. Why don't you take... wait what am I saying??? I'm savin' the rest for later!",
                        "NextIndex": 43,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aahhh well that's been a full day of eating for me gonna head to sleep. I know they say the way to a blobs heart is through his stomach so I should be tellin' ya that I'm flattered but not interested.",
                        "NextIndex": 44,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Actually I might need a snack if I wake during the night. I've seen some monsters in the Twilight Desert snackin' on some cookies so a few of those would be batchin'. <br> QUEST: Get rare cookie drops from Twilight Desert mobs.",
                        "NextIndex": 46,
                        "Name": "A Midnight Snack"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 3 inventory spaces!",
                        "NextIndex": 44,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yep thats just what I was fixin' for. It's been a great day gamer but it's time for you to get lost hehe. Here's a token for helping me out today.",
                        "NextIndex": 47,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But lets be real tokens are for suckers. If you want a big boy prize to show off to the world help me out for a whole month. <br> QUEST:Collect 30 Picnic tokens and you'll get a trophy!",
                        "NextIndex": 49,
                        "Name": "King of Food"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear 1 inventory spaces!",
                        "NextIndex": 47,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "King of food! King of food! And coming from a blobulyte like myself that means something! But hey that shouldn't stop you from doin' stuff for me eh? Hahaha I'll be here tomorrow if you wanna help out again.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Hamish", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Froggy Fields",
                    "world": "Blunder Hills",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 6.82,
                    "starSign": "Leo",
                    "mothersMaidenName": "Johnson",
                    "notes": "[[Hamish]] is found in [[Worlds#G3 - Froggy Fields|Froggy Fields]], the second zone of Grasslands, located in the bottom of the area.$NEWLINE$$NEWLINE$He primarily focuses on account-wide items only one character has to unlock for all to benefit from, the only exception is a {{CraftReq|Talent Point Reset Potion}}.$NEWLINE$"
                },
                "quests": {
                    "The Hamazing Plot Twist": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I guess the stamp is kinda cool but I'd rather have a real Hatchet! The one I have now is plastic. <br> QUEST:Find an axe to trade for the stamp!",
                        "NextIndex": 4,
                        "Name": "The Hamazing Plot Twist",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "StampA4", "quantity": 1}, <ExpRewardModel>{"item": "Experience3", "quantity": 100}],
                        "QuestName": "Hamish1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "EquipmentToolsHatchet3", "quantity": 1}]
                    },
                    "Should We Tell Him?": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I heard WIS increases choppin efficiency. I have this recipe for a WIS hat but I don't specialize in smithing so I can't make it! Make it for me and I'll give you another stamp! <br> QUEST:Use the recipe and craft the helmet.",
                        "NextIndex": 8,
                        "Name": "Should We Tell Him?",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <ComponentModel>{"item": "StampB6", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience3", "quantity": 150},
                            <ComponentModel>{"item": "ResetCompleted", "quantity": 1}
                        ],
                        "QuestName": "Hamish2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": "Recipe drops from this NPC before quest."},
                        "ItemReq": [<ComponentModel>{"item": "EquipmentHats8", "quantity": 1}]
                    },
                    "Slime for Storage": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'll give you my storage chest for... exactly 1 billion slime sludge and not a single one less! <br> QUEST:Get them 50 slime sludge. They're like lv. 3 they'll accept.",
                        "NextIndex": 12,
                        "Name": "Slime for Storage",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 11,
                        "Rewards": [<ComponentModel>{"item": "InvStorage1", "quantity": 1}, <ExpRewardModel>{"item": "Experience3", "quantity": 150}],
                        "QuestName": "Hamish3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "Requires level 7 choppin to start this quest."},
                        "ItemReq": [<ComponentModel>{"item": "Jungle1", "quantity": 50}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hi want to trade stuff? I have tons of cool things oak logs bleach logs maple logs you name it!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You want a stamp? I have one of those!!! Me and my siblings all nabbed one from our Dad before we left home! He wanted to teach us economics and business... boring! We just want to adventure!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I guess the stamp is kinda cool but I'd rather have a real Hatchet! The one I have now is plastic. <br> QUEST:Find an axe to trade for the stamp!",
                        "NextIndex": 4,
                        "Name": "The Hamazing Plot Twist"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Neato axe! But I can't give you the stamp you're inventory is full!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Deal! This is gonna bump up my choppin power so much I bet I'll finally be able to fully chop down this tree!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hmm this tree is tough! I think I need something else...",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I heard WIS increases choppin efficiency. I have this recipe for a WIS hat but I don't specialize in smithing so I can't make it! Make it for me and I'll give you another stamp! <br> QUEST:Use the recipe and craft the helmet.",
                        "NextIndex": 8,
                        "Name": "Should We Tell Him?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up 1 space for the stamp!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Wow my Choppin Efficiency is mega huge now! This tree wont stand a chance! Come on back later I'll surely have this tree chopped down to the roots by then! <br> Return at Choppin Lv. 7",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well I've only got one stamp left but I'm holding onto it! Buuuut since you got my previous stamps I don't really need this storage chest for anything.",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'll give you my storage chest for... exactly 1 billion slime sludge and not a single one less! <br> QUEST:Get them 50 slime sludge. They're like lv. 3 they'll accept.",
                        "NextIndex": 12,
                        "Name": "Slime for Storage"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're out of inventory. Clear up 1 space and come back!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Thats uh quite a few less than a billion. But that Quest Notifier was right I'll still accept! Here's the storage chest it's super OP for a big time adventurer like you!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Idk what to do with all this sludge! It's very cool looking at least.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Grasslands Gary", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Unknown",
                    "world": "Unknown",
                    "noQuest": 0,
                    "repeatable": "Unknown",
                    "type": "Unknown",
                    "birthWeight": 9.68,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Soloman",
                    "notes": ""
                },
                "quests": {},
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Sup gamer I see you've gotten comfortable enough to start tapping on NPCs other than Scripticus down there.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "You're still pretty new though so I'm gonna keep quiet until I think you're ready to learn some new stuff. <br> Return at Lv.14 after you pick a class from Promotheus in the map after Froggy Fields",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey you're still playing! Alright so I'm a Taskmaster. I've got a bunch of tasks for you to complete while you're out there adventuring. For each one you complete you'll get points to spend!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Everything you do here is account wide no reason to talk to me on a specific charactrer!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey! Looks like you've found your way to creating another character! Your tasks are shared amongst all your characters so I'll go ahead and link you to your Family's Task list!",
                        "NextIndex": 9999,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'll go ahead and open up the first set of Tasks. You're gonna have to see my friends to get the other sets. They're located in the other towns.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Mr Pigibank", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.09,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Jackson",
                    "notes": "[[Mr Pigibank]] is found in the [[Worlds#G1 - Blunder Hills|starting town]], located at the top section of the area.$NEWLINE$$NEWLINE$Upon completing his quest the player is awarded with the ability to deposit and upgrade [[File:Longsword_Stamp.png|36px]] [[Stamps]], as well as purchase [[Stamps#Bribes|Bribes]] for account-wide bonuses.$NEWLINE$"
                },
                "quests": {
                    "A Pig and his Stamps": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Tell you what if you find out who ran off with my Stamps I think I may be able to set up a business with you! <br> QUEST:Find out who stole the Stamp Collection",
                        "NextIndex": 6,
                        "Name": "A Pig and his Stamps",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ExpRewardModel>{"item": "Experience0", "quantity": 150}],
                        "QuestName": "Mr Pigibank1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " The Stamp Thief is Hamish found at the bottom right of the frogs area"},
                        "CustomType": "Mr Pigibank1",
                        "CustomArray": [<CustomReqModel>{"desc": "Stamp Thief Found:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hmpf by the looks of your clothes I don't suppose you're here to make a deposit.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ha! Don't worry lad I'm just messin' with you. The name's Preston Pigibank used to run a chain of highly successful banks from here to the Snowy Mountains if you can believe that!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Of course I had to sell the business once those fancy chests came around. Can you believe those things? You put your items in them and they just magically appear in all the other chests!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "All this free time serves me well though I've gotten to pursue my passion for collecting rare and powerful items and I get to spend more time teaching my kids about business.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well not so much that last part anymore... I haven't seen any of the little ones for a while and even worse my recent collection of Power Stamps disappeared!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Tell you what if you find out who ran off with my Stamps I think I may be able to set up a business with you! <br> QUEST:Find out who stole the Stamp Collection",
                        "NextIndex": 6,
                        "Name": "A Pig and his Stamps"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah looks like you have some news! So who was the wretched monster that stole my stamps? ...what? You didn't get a clear look of them? Oh well it was probably just an old business rival of mine.",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well good thing is I've actually found some Stamps in my desk while you were gone so at least we can start with something. So lets talk business!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "These stamps aren't just pieces of paper they actually give their owners Special Bonuses! I'm not really the adventuring type so how about we sell Ownership of the stamps to others! And by 'we' I mean Me and by 'Others' I mean You!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So have we got a Deal? Great! Bring me all the stamps you can get and I'll give you their Bonuses for a bit of money!",
                        "NextIndex": 9999,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hang on lad you look familiar... did you get a haircut? <br> Hahaha I'm only foolin' I know all about the multi character system in this world!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Come on over I'll give you access to your stamps! No need for that prequest nonsense OINK!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Promotheus", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Valley Of The Beans",
                    "world": "Blunder Hills",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 2.29,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Lopez",
                    "notes": "[[Promotheus]] is found in [[Worlds#G4 - Valley Of The Beans|Valley of the Beans]], the third zone of Grasslands, located in the middle left side of the area.$NEWLINE$$NEWLINE$Upon completing his first quest the player is given a quest allowing them to choose [[Classes#Warrior|one of three main classes: Warrior, Archer or Mage]].$NEWLINE$$NEWLINE$He also gives hints on how to find [[Baba Yaga]].$NEWLINE$"
                },
                "quests": {
                    "I'm Ready, Promotion!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Good thing for that too because it looks like you could use a promotion what with you being a Beginner and all that! Come talk to me once you're level 10.",
                        "NextIndex": 3,
                        "Name": "I'm Ready, Promotion!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 3,
                        "Rewards": [<CoinRewardModel>{"item": "", "quantity": 500}, <ComponentModel>{"item": "rtt0", "quantity": 5}],
                        "QuestName": "Promotheus1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Promotheus1",
                        "CustomArray": [<CustomReqModel>{"desc": "Achieve Level 10:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Three Right Answers": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 11,
                        "Name": "Three Right Answers",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 24,
                        "Rewards": [
                            <ComponentModel>{"item": "ResetCompleted", "quantity": 1},
                            <ComponentModel>{"item": "ResetFrag", "quantity": 8},
                            <CoinRewardModel>{"item": "", "quantity": 1000}
                        ],
                        "QuestName": "Promotheus2",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": "This quest can also be completed if you're a journeyman."},
                        "CustomType": "Promotheus2",
                        "CustomArray": [<CustomReqModel>{"desc": "Select a New Class:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Slovakian Scare": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "It was a giant house with... legs or something. I think it only shows up at the top of each hour but I know it exists! Please go prove I'm not crazy. <br> QUEST:Find the house monster in the Birch Grove.",
                        "NextIndex": 19,
                        "Name": "Slovakian Scare",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 18,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentHats29", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 1500},
                            <ComponentModel>{"item": "ResetCompleted", "quantity": 1}
                        ],
                        "QuestName": "Promotheus3",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "[[Baba Yaga]] spawns at the top of each hour (xx:00) in the Birch Grove (portal just below Promotheus, next to the Birch Tree). See the [[Baba Yaga]] page for more information. "
                        },
                        "CustomType": "Promotheus3",
                        "CustomArray": [<CustomReqModel>{"desc": "House Monster Found:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Witcher, but not Really": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "What did you say it was again a Baby Yogurt? ... a Baboon Yolo? <br> Ohhh a Baba Yaga of course! Yea I've never heard of that in my life. I wonder what it drops? <br> QUEST:Me too go kill it and see what loot you get!",
                        "NextIndex": 22,
                        "Name": "The Witcher, but not Really",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 21,
                        "Rewards": [<ComponentModel>{"item": "InvBag4", "quantity": 1}, <ComponentModel>{"item": "ExpBalloon1", "quantity": 2}],
                        "QuestName": "Promotheus4",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "[[Baba Yaga]] spawns at the top of each hour (xx:00) in the Birch Grove (portal just below Promotheus, next to the Birch Tree). See the [[Baba Yaga]] page for more information. "
                        },
                        "CustomType": "Promotheus4",
                        "CustomArray": [<CustomReqModel>{"desc": "Baba Yaga Defeated:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hello there adventurer! Uh... I know my bulging sack is quite the eyegrabber but my face is down here!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I am the mighty Promotheus Giver of Class Promotions! I was initially going to fill in for Atlas but after I saw what Kratos did to him I decided to lay low in a more obscure game for a while!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Good thing for that too because it looks like you could use a promotion what with you being a Beginner and all that! Come talk to me once you're level 10.",
                        "NextIndex": 3,
                        "Name": "I'm Ready, Promotion!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great now listen carefully. After I'm done talking here you'll get the option to choose 1 of 3 Classes. This is a Permanent Decision.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "First the WARRIOR class. They are close ranged single target fighters who won't get knocked down easy. They are the slowest moving class but their brawn makes them great at Physical Skills like Mining.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Next the ARCHER class. Quick on their feet they'll rapidly pick off weaker enemies from a distance. They do struggle to take down big targets but their agility makes them great at Crafting Skills like Smithing.",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Lastly the MAGE class. They'll zap freeze burn or even poison their enemies to death. They will get downed by even the slightest of hits but their high IQ makes them great at Collection Skills like Choppin.",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Now before you decide I must tell you one more thing...",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "This may sound strange but this will not be your only character!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You will create dozens of characters so you'll eventually get to play as ALL the different classes! So just pick the class you think you will enjoy first and know that you'll get to play the other ones later!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 11,
                        "Name": "Three Right Answers"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That's a great choice! You should go talk to Grasslands Gary in town now get yourself some Class Recipes to match your choice! <br> And don't forget to come back here on new characters to pick the other classes!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well then... now that we've gotten to know each other a bit how about I tell you some game lore?",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "HAH! Just kidding a game like this doesn't have any lore! <br> ...so anyway the loremasters of this game speak of an ancient land far above these lazy ol' Blunder Hills.",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "In this crazy place there are weird sub mechanics and overly complicated gameplay systems the likes of which we simple World 1 NPC's could never comprehend.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "The monsters here are even crazier many are references to something called 'pop culture' which I assume is some sort of Bubble Religion in their land.",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "But how could I possibly know that right? Well this is where it gets interesting. You see I've seen one myself see? But no one seems believes see... err me.",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "It was a giant house with... legs or something. I think it only shows up at the top of each hour but I know it exists! Please go prove I'm not crazy. <br> QUEST:Find the house monster in the Birch Grove.",
                        "NextIndex": 19,
                        "Name": "Slovakian Scare"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 1 more inventory space. Make some room and come back!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait you actually found it? Huh guess I won't be selling many of my alien merchandise anymore... you can take some if youd like!",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "What did you say it was again a Baby Yogurt? ... a Baboon Yolo? <br> Ohhh a Baba Yaga of course! Yea I've never heard of that in my life. I wonder what it drops? <br> QUEST:Me too go kill it and see what loot you get!",
                        "NextIndex": 22,
                        "Name": "The Witcher, but not Really"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 1 more inventory space. Make some room and come back!",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Did you get anything good? I was talking to the loremasters while you were away and they tell me this 'Baba Yaga' monster has a chance to drop a pet egg!",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "They said the egg is used for future content so if you ever find it you should probably hold onto it!",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up 2 spaces in your item bag!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Bushlyte", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Vegetable Patch",
                    "world": "Blunder Hills",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "Secret",
                    "birthWeight": 6.97,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Rodriguez",
                    "notes": "[[Bushlyte]] is hidden within the [[Worlds#J3 - Vegetable Patch|Vegetable Patch]]. See [[Secrets]] for more details.$NEWLINE$"
                },
                "quests": {
                    "A Peanut for your Thoughts": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "PLEZ I WANT MOAR PEANUT!",
                        "NextIndex": 3,
                        "Name": "A Peanut for your Thoughts",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "StoneZ1", "quantity": 1}, <CoinRewardModel>{"item": "", "quantity": 777}],
                        "QuestName": "Bushlyte1",
                        "Difficulty": 1,
                        "note": <NoteModel>{
                            "note": "Get this quest by dropping a {{CraftReq|Peanut}} on the bush in Vegetable Patch."
                        },
                        "ItemReq": [<ComponentModel>{"item": "Peanut", "quantity": 50}]
                    },
                    "Honk if you Love Peanuts!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "MOAR PEANUT MOAR PEANUT!!",
                        "NextIndex": 6,
                        "Name": "Honk if you Love Peanuts!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 5,
                        "Rewards": [<ComponentModel>{"item": "StoneZ1", "quantity": 2}, <CoinRewardModel>{"item": "", "quantity": 1500}],
                        "QuestName": "Bushlyte2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Peanut", "quantity": 200}]
                    },
                    "A Peanut Saved is a Peanut not Eaten!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "MOOOOOAAAAAARRRRR!!!",
                        "NextIndex": 9,
                        "Name": "A Peanut Saved is a Peanut not Eaten!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneZ1", "quantity": 3},
                            <ComponentModel>{"item": "PeanutS", "quantity": 1},
                            <CoinRewardModel>{"item": "", "quantity": 2500}
                        ],
                        "QuestName": "Bushlyte3",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Drop the {{CraftReq|Stone Peanut}} at the [[Rocklyte]] to start the final part of the questline."
                        },
                        "ItemReq": [<ComponentModel>{"item": "Peanut", "quantity": 400}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "MMMM... PEEAAANUT",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "PLEZ I WANT MOAR PEANUT!",
                        "NextIndex": 3,
                        "Name": "A Peanut for your Thoughts"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "ME GIV U NON PEANUT GIFT BUT U NEED SPACE",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "NOMNOMNOM...",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "MOAR PEANUT MOAR PEANUT!!",
                        "NextIndex": 6,
                        "Name": "Honk if you Love Peanuts!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "ME GIV U NON PEANUT GIFT BUT U NEED SPACE",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "NOMNOMNOMNOMNOM...",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "MOOOOOAAAAAARRRRR!!!",
                        "NextIndex": 9,
                        "Name": "A Peanut Saved is a Peanut not Eaten!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "ME GIV U NON PEANUT GIFT BUT U NEED SPACE",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "NOMNOMNOMNOMNOMNOMNOMNOM!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "THANX FRIEND! I DONUT USUALLY SAY THIS BUT I AM IN SECRET GROUP VERY FUN!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WE ARE EXCLUSIVE BUT UR NICE GUY SO HERE IS HINT RETURN TO ME WITH A SIMPLER MIND AND PLACE IN GROUP YOU SHALL FIND! I SAY NO MORE NO NO!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "PEEAAANUTT!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WOOAH...U ARE STILL BEGINNER! BEGINNER IS BEST CLASS I AM BEGINNER TOO!!! BUT U CAN BE BETTER BEGINNER I KNOW HOW!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "DROP STONE PEANUT AT MARKED ROCK IN GRASSY LANDS.... YUMMY OFFERING FOR ROCKLYTE FRIEND! HE WILL LET U JOIN SECRET GROUP AND BECOME BEST BEGINNER!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Rocklyte", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Froggy Fields",
                    "world": "Blunder Hills",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "Secret",
                    "birthWeight": 3.32,
                    "starSign": "Aquarius",
                    "mothersMaidenName": "Ramirez",
                    "notes": "[[Rocklyte]] is hidden within [[Worlds#G3 - Froggy Fields|Froggy Fields]]. In order to find him, you must complete [[Bushlyte|Bushlyte's]] quests. See [[Secrets]] for more details.$NEWLINE$"
                },
                "quests": {
                    "How It's Made, Episode 7. The Super Peanut": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "U NEVER MAKE SHINY PEANUT? BRING ME 500 PEANUT AND I SHOW U HOW.",
                        "NextIndex": 4,
                        "Name": "How It's Made, Episode 7. The Super Peanut",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <RecipeRewardModel>{"item": "SmithingRecipes1", "quantity": 51},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 5000}
                        ],
                        "QuestName": "Rocklyte1",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Drop the {{CraftReq|Stone Peanut}} at the rock on the bottom right side of Froggy Fields"
                        },
                        "ItemReq": [<ComponentModel>{"item": "Peanut", "quantity": 500}]
                    },
                    "If Life Gives you Peanuts, make Shiny Peanuts!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "GO MAKE ME A MILLION BILLION SHINY PEANUTS AND I WILL HELP! ... THAT TOO MANY? OKEY JUST MAKE 5!",
                        "NextIndex": 7,
                        "Name": "If Life Gives you Peanuts, make Shiny Peanuts!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "StoneZ1", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 5000}],
                        "QuestName": "Rocklyte2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "This quest gives the recipe for Golden Peanut"},
                        "ItemReq": [<ComponentModel>{"item": "PeanutG", "quantity": 5}]
                    },
                    "Becoming the Best Beginner": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 10,
                        "Name": "Becoming the Best Beginner",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 9,
                        "Rewards": [<ComponentModel>{"item": "Trophy3", "quantity": 1}, <TalentRewardModel>{"item": "TalentBook1", "quantity": 361650}],
                        "QuestName": "Rocklyte3",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": "This quest can only be completed by a beginner (no class chosen)"},
                        "CustomType": "Rocklyte3",
                        "CustomArray": [<CustomReqModel>{"desc": "Become a Journeyman:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "PEANUT!!! YEEE!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "U WANT TO JOIN CLUB? BE BEST BEGINNER? YEEE THAT IS GOOD! BUT I WANT SHINY PEANUT FIRST!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "U NEVER MAKE SHINY PEANUT? BRING ME 500 PEANUT AND I SHOW U HOW.",
                        "NextIndex": 4,
                        "Name": "How It's Made, Episode 7. The Super Peanut"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "UR BAG IS FULL! I NEED TO GIVE U RECIPE MAKE ROOM!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "U SEE THAT? NOW U CAN DO IT TOO!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "GO MAKE ME A MILLION BILLION SHINY PEANUTS AND I WILL HELP! ... THAT TOO MANY? OKEY JUST MAKE 5!",
                        "NextIndex": 7,
                        "Name": "If Life Gives you Peanuts, make Shiny Peanuts!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "UR BAG IS FULL! I NEED TO GIVE U RECIPE MAKE ROOM!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "OOOO SO SHINY!! YEEEE! <br> OK I WILL HELP U BE BEST BEGINNER!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 10,
                        "Name": "Becoming the Best Beginner"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "UR BAG IS FULL! I NEED TO GIVE U CLUB MEMBER CARD MAKE ROOM!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WELCOME TO CLUB! BEGINNER FOR LIFE!!! BUT U CAN STILL BE MORE BEGINNEREST LONG WAY TO GO! DESERT MEMBER KNOW MORE THAN ME GO FIND THEM!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Cactolyte", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Djonnuttown",
                    "world": "Yum-Yum Desert",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "Secret",
                    "birthWeight": 2.88,
                    "starSign": "Sagittarius",
                    "mothersMaidenName": "Hancock",
                    "notes": "[[Cactolyte]] is hidden within Djonnuttown. See [[Secrets]] for more details.$NEWLINE$"
                },
                "quests": {
                    "Super Skillage": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "ROCK BUSTING HAMMER HITTING AND THE TREE THINGY! THEY ARE SOME SKILLS YOU NEED! <br> QUEST:Get the required skill levels in Mining Smithing and Choppin to impress Cactolyte club member!",
                        "NextIndex": 7,
                        "Name": "Super Skillage",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 50}, <ComponentModel>{"item": "Timecandy4", "quantity": 4}],
                        "QuestName": "Cactolyte1",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Get this quest by dropping a {{CraftReq|Bag o Nuts}} on the cactus in Djonnuttown."
                        },
                        "CustomType": "Cactolyte1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Mining Lv", "finalV": 32, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Smithing Lv:", "finalV": 35, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Choppin' Lv:", "finalV": 33, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Top Skillage": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "OCEAN MURDER WATER STIRRING AND THE BUGGY ONE! THEY ARE THE OTHER SKILLS YOU NEED! <br> QUEST:Get the required skill levels in Fishing Alchemy and Catching to impress Cactolyte club member!",
                        "NextIndex": 10,
                        "Name": "Top Skillage",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 9,
                        "Rewards": [<ComponentModel>{"item": "Timecandy5", "quantity": 1}],
                        "QuestName": "Cactolyte2",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Cactolyte2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Fishing Lv", "finalV": 23, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Alchemy:", "finalV": 25, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Catching Lv:", "finalV": 25, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Peanut De-Aging": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I HAVE A PEANUT IT IS VERY OLD. IT WAS MY FIRST PEANUT... IT IS MY BEST FRIEND!! IT WILL DECAY TO DUST SOON PLEASE MAKE IT BETTER! <br> QUEST:Defeat Biggie Hours with this peanut in your inventory. Don't drop it or it'll decay to dust in 5 seconds flat!",
                        "NextIndex": 13,
                        "Name": "Peanut De-Aging",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 12,
                        "Rewards": [
                            <ComponentModel>{"item": "ExpBalloon2", "quantity": 20},
                            <ComponentModel>{"item": "ExpBalloon2", "quantity": 10},
                            <ComponentModel>{"item": "ExpBalloon3", "quantity": 5}
                        ],
                        "QuestName": "Cactolyte3",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "You need at least 594 defense to take 0 damage from Biggie Hours. Defeating him outside the colosseum using Googley Eyes also grants quest completion."
                        },
                        "ItemReq": [<ComponentModel>{"item": "Quest48", "quantity": 1}]
                    },
                    "Maestro! The Stro! Mman!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 17,
                        "Name": "Maestro! The Stro! Mman!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 16,
                        "Rewards": [<ComponentModel>{"item": "Trophy13", "quantity": 1}],
                        "QuestName": "Cactolyte4",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Cactolyte4",
                        "CustomArray": [<CustomReqModel>{"desc": "Become a Maestro:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "PEANUTS!!! ENTIRE BAG TOO YEE!!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "VERY COOL TO SEE A CLUB MEMBER MANY RAGEQUIT BEFORE FINDING ME!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I AM MAESTRO MEMBER CACTOLYTE! I AM NEXT STEP TO YOU BECOMING THE BESTEST BEGINNER TO EVER BEGIN EVER!!!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "AS LONG AS LAVA DOESNT INTERRUPT ME I CAN GIVE YOU QUEST TO BECOME A MAESTRO CLASS YOURSELF!... <br> ... ALRIGHT NICE! LAVAS NOT AROUND LETS DO THIS!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I AM UNDER STRICT ORDERS FROM CLUB LEADER HE TELL ME TO ONLY RANK UP PEEPLE WHO ARE TOP SKILLAGE!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "ROCK BUSTING HAMMER HITTING AND THE TREE THINGY! THEY ARE SOME SKILLS YOU NEED! <br> QUEST:Get the required skill levels in Mining Smithing and Choppin to impress Cactolyte club member!",
                        "NextIndex": 7,
                        "Name": "Super Skillage"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "NO INVENTORY SPACE! NO PLS FIX!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "SWEET SKILLAGE! BUT THATS NO TOP SKILLAGE YOU ARE NOT READY JUST YET!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "OCEAN MURDER WATER STIRRING AND THE BUGGY ONE! THEY ARE THE OTHER SKILLS YOU NEED! <br> QUEST:Get the required skill levels in Fishing Alchemy and Catching to impress Cactolyte club member!",
                        "NextIndex": 10,
                        "Name": "Top Skillage"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "NO INVENTORY SPACE! NO PLS FIX!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WOWOWOW!!! OK WOW! THATS SOME SUPER SKILLAGE! BUT I AM VERY SAD TOO SAD TO GIVE YOU NEW CLASS MEMBERSHIP. <br> UNLESS... COULD YOU HELP ME?",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I HAVE A PEANUT IT IS VERY OLD. IT WAS MY FIRST PEANUT... IT IS MY BEST FRIEND!! IT WILL DECAY TO DUST SOON PLEASE MAKE IT BETTER! <br> QUEST:Defeat Biggie Hours with this peanut in your inventory. Don't drop it or it'll decay to dust in 5 seconds flat!",
                        "NextIndex": 13,
                        "Name": "Peanut De-Aging"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "NO INVENTORY SPACE! NO PLS FIX!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "PETE!!! YAYYYYYY!!! OMG PETE YOU LOOK GOOD! <br> ... GOOD ENOUGH TO EAT! <br> NOM!!!!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "D: <br> PETE NOOOO!!!!!! I DIDNT MEAN IT I DIDNT MEAN IT!!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 17,
                        "Name": "Maestro! The Stro! Mman!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "UR BAG IS FULL! I NEED TO GIVE U NEW RANK TROPHY MAKE ROOM!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "OH WELL AT LEAST PETE WAS TASTY! OH HEY YOURE A MAESTRO NOW COOL!!!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Stiltzcho", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Jungle Perimeter",
                    "world": "Blunder Hills",
                    "noQuest": 6,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 2.73,
                    "starSign": "Capricorn",
                    "mothersMaidenName": "Wilson",
                    "notes": "[[Stiltzcho]] is found in [[Worlds#J1 - Jungle Perimeter|Jungle Perimeter]], the first zone of the Jungle, located to the left of the area. His quests can be considered a DPS and skill check for progressing [[Scripticus]]' questline. Dropping a [[Grass Leaf]] on him is a possible daily [[Tasks#Blunder Hills|Task]].$NEWLINE$"
                },
                "quests": {
                    "Outta the Way Slimes": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Thay do respawn very quick so you must do it fast! Remember to Forfeit the Quest using the Codex if you run out of time! <br> QUEST:Kill 10 Slimes before time runs out",
                        "NextIndex": 7,
                        "Name": "Outta the Way Slimes",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentStatues2", "quantity": 3},
                            <ComponentModel>{"item": "FoodPotGr2", "quantity": 25},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 2000}
                        ],
                        "QuestName": "Stiltzcho1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Stiltzcho1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Slimes Defeated", "finalV": 10, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 140}
                        ]
                    },
                    "No Stone Unturned": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "There must be some sort of clue there. I'll wait here while you go searching that way I can be well rested to investigate your find! <br> QUEST:Kill Baby Boa Snakes until you find a clue",
                        "NextIndex": 12,
                        "Name": "No Stone Unturned",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentStatues2", "quantity": 2},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 1},
                            <CoinRewardModel>{"item": "", "quantity": 1000}
                        ],
                        "QuestName": "Stiltzcho2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Quest7", "quantity": 4}]
                    },
                    "Investigator by Day, Prankster by Night": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go get me some carrots and logs so I can make a little carrot mannequin for you to prank him with and I'll have the report ready when you return! <br> QUEST:Gather carrots from the Vegetable Grove as well as some logs.",
                        "NextIndex": 18,
                        "Name": "Investigator by Day, Prankster by Night",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 17,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest6", "quantity": 1},
                            <ComponentModel>{"item": "EquipmentPendant11", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 1000}
                        ],
                        "QuestName": "Stiltzcho3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Jungle3", "quantity": 2}, <ComponentModel>{"item": "BirchTree", "quantity": 3}]
                    },
                    "Time Crime Episode 1": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I remember being a baby leaf and felt time just flew by as I would be spending of days watch the Spores... maybe they are stealing it? <br> QUEST:Investigate Green Spores near town to see which one is stealing Stiltzcho's time.",
                        "NextIndex": 25,
                        "Name": "Time Crime Episode 1",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 24,
                        "Rewards": [<ComponentModel>{"item": "Timecandy2", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 4000}],
                        "QuestName": "Stiltzcho4",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "AFK at the [[Green Mushroom]] map for a total of 4 hours. The time spent AFK does not have to be all in one go. Choppin the Oak Tree counts, because it's on the same map."
                        },
                        "CustomType": "Stiltzcho4",
                        "CustomArray": [<CustomReqModel>{"desc": "AFK at Spores:", "finalV": 14400, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Time Crime Episode 2": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well no matter because the thief followed me after I moved out to the Froggy Fields! Go look there and be careful you do not get your time taken from you! <br> QUEST:Investigate Frogs to see which one is has been hoppin' away with Stiltzcho's time!",
                        "NextIndex": 28,
                        "Name": "Time Crime Episode 2",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 27,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 4000}],
                        "QuestName": "Stiltzcho5",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "AFK at the [[Frog]] map for a total of 8 hours. The time spent AFK does not have to be all in one go."
                        },
                        "CustomType": "Stiltzcho5",
                        "CustomArray": [<CustomReqModel>{"desc": "AFK at Frogs:", "finalV": 28800, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Time Crime Season Finale": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The thief must be in this very map!! We've got them now!! <br> QUEST:Investigate Slimes to see which  of these slimeballs is the real thief of with Stiltzcho's time!!",
                        "NextIndex": 31,
                        "Name": "Time Crime Season Finale",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 30,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken4", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy5", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 4000}
                        ],
                        "QuestName": "Stiltzcho6",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": " AFK at the [[Slime]] map for a total of 16 hours. The time spent AFK does not have to be all in one go."
                        },
                        "CustomType": "Stiltzcho6",
                        "CustomArray": [<CustomReqModel>{"desc": "AFK at Slimes:", "finalV": 57600, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hallo! Welcome to tha Jungle. I am pleased to make your aquaintance! <br> QUEST:Go complete Scripticus' quests until he asks you for Foreign Aid... ok this isn't really a quest but Stiltzcho wont wanna talk to you until you do that!",
                        "NextIndex": 0,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Scripticas needs help huh? Hehe he is very funni... I used to talk in my nativ language around him when I lived in town. He could nevar understand me and would awkwardly say 'uh yea!' to evarything I said! Best practical joke ever!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So what is needed then?           <br> ...someone stole tha town Gem? This is very troubling indeed! I am glad you were sent to me I believe I may be of help.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I have heard talk of a beeg golem passing through. I have heard many story of it they say tha golem was over 400 pixels tall and was carrying a big sword with a gem on it!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I can investigate further myself but I need you to clear a path for me by defeating some of these slimes.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Thay do respawn very quick so you must do it fast! Remember to Forfeit the Quest using the Codex if you run out of time! <br> QUEST:Kill 10 Slimes before time runs out",
                        "NextIndex": 7,
                        "Name": "Outta the Way Slimes"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need inventory space! Please clear up 1 slot!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Very niiice now lets see what I can find around here...",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aha! Just as I suspected there is a strange absense of slimes in this area! Thats a clear sign that tha Golem has been this way...",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Humm but which way did he go? He was surely too big to fit in tha tree so he must have gone left.",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "There must be some sort of clue there. I'll wait here while you go searching that way I can be well rested to investigate your find! <br> QUEST:Kill Baby Boa Snakes until you find a clue",
                        "NextIndex": 12,
                        "Name": "No Stone Unturned"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up 2 inventory space so I can give you some stuff I made while you were gone!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aha! These strange rocks must be pieces of tha golem!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Now then you found those to the left of here... so that must mean the golem moved left of here! Oh yeh it's all coming together...",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "One last thing before I write up a report. It has been so long since I got to play a joke on Scripticas and I want you to help me pull another one on him!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Before I left I kept putting carrots everywhere he went. I put one on his desk at his front door I even put carrots in his dinner! Tha last one didn't work though because he was eating carrot cake that night.",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go get me some carrots and logs so I can make a little carrot mannequin for you to prank him with and I'll have the report ready when you return! <br> QUEST:Gather carrots from the Vegetable Grove as well as some logs.",
                        "NextIndex": 18,
                        "Name": "Investigator by Day, Prankster by Night"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up 2 inventory spaces ya?",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Here is tha scouting report! I think Scripticas will know where to proceed from here.",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Also about the prank... I kind of messed up and made a nightmare inducing abomination which isn't tha joke I was going for. You can just keep it instead okey?",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Anywho come back if you ever want to help me on my own scouting missions! <br> Return at Lv. 30",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Walecome back comrade! I am very please to see you! I have been of a search for something very important...",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You see... someone or some'THING' keeps stealing my time! I do not know what it is but it has followed me for maybe forever and I feel like I can't get things done!",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I remember being a baby leaf and felt time just flew by as I would be spending of days watch the Spores... maybe they are stealing it? <br> QUEST:Investigate Green Spores near town to see which one is stealing Stiltzcho's time.",
                        "NextIndex": 25,
                        "Name": "Time Crime Episode 1"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up 2 inventory spaces ya?",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Did u find anything sus? No? Hummmm... the time thief must have moved from there ages ago!",
                        "NextIndex": 26,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well no matter because the thief followed me after I moved out to the Froggy Fields! Go look there and be careful you do not get your time taken from you! <br> QUEST:Investigate Frogs to see which one is has been hoppin' away with Stiltzcho's time!",
                        "NextIndex": 28,
                        "Name": "Time Crime Episode 2"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up 2 inventory spaces ya?",
                        "NextIndex": 26,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You still have not found who is wasting all of my time? Well after I left Froggy Fields I moved right to here so....",
                        "NextIndex": 29,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The thief must be in this very map!! We've got them now!! <br> QUEST:Investigate Slimes to see which  of these slimeballs is the real thief of with Stiltzcho's time!!",
                        "NextIndex": 31,
                        "Name": "Time Crime Season Finale"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear up 2 inventory spaces ya?",
                        "NextIndex": 29,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What? You still have found nothing at all?? So I was just send you all over Blunder Hills where you waited for hours and hours all for nothing?",
                        "NextIndex": 32,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I am big sorry to have wasted your time like this I guess the thief moved o--- wait a minute...",
                        "NextIndex": 33,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'M THE THIEF!",
                        "NextIndex": 34,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Haha I guess it is that I just get easily sidetrack and lose focus often and instead of investigating myself for the problem I tried to blame someone else!",
                        "NextIndex": 35,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I think I will take some time alone having rest when it is needed is NEVER a waste of time even for a leaf like me!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Funguy", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Winding Willows",
                    "world": "Blunder Hills",
                    "noQuest": 5,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 7.6,
                    "starSign": "Sagittarius",
                    "mothersMaidenName": "Taylor",
                    "notes": "[[Funguy]] is found in [[Worlds#J2 - Winding Willows|Winding Willows]], the second zone of the Jungle, located in the bottom left of the area. Saying 'hi' to him is a possible daily [[Tasks#Blunder Hills|Task]].$NEWLINE$$NEWLINE$His final quest awards the {{CraftReq|Funguy Token}}.$NEWLINE$"
                },
                "quests": {
                    "Mushroom Munchies": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But uh you gooootta hook us up with some food bro it's common mushroom manners! Bring it here and we'll carry it to the party with this novelty food bag I bought online when I was... hehehe well never mind! <br> QUEST:Be the food hookup",
                        "NextIndex": 4,
                        "Name": "Mushroom Munchies",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "MaxCapBag10", "quantity": 1},
                            <ComponentModel>{"item": "ResetCompleted", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 800}
                        ],
                        "QuestName": "Funguy1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": "The [[Peanut]] recipe comes from [[Picnic Stowaway]]."},
                        "ItemReq": [
                            <ComponentModel>{"item": "Peanut", "quantity": 100},
                            <ComponentModel>{"item": "FoodHealth2", "quantity": 25},
                            <ComponentModel>{"item": "FoodPotOr2", "quantity": 100}
                        ]
                    },
                    "Videogame Highscores are COOL!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You ever played that choppin' minigame? Everyone around here loooves that game you'd get mad respect from having a siiiick score to brag about! <br> QUEST:Get a score of 35 in the Choppin Minigame.",
                        "NextIndex": 8,
                        "Name": "Videogame Highscores are COOL!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <RecipeRewardModel>{"item": "SmithingRecipes1", "quantity": 44},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 3000},
                            <CoinRewardModel>{"item": "", "quantity": 1250}
                        ],
                        "QuestName": "Funguy2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Funguy2",
                        "CustomArray": [<CustomReqModel>{"desc": "Choppin Score:", "finalV": 35, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Partycrastination": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Buuuuut it's still not time to go yet. Trust me you do NOT wanna be the first one to this party... but a kiiiiiller like you already knew that for sure! <br> QUEST:Wait until the party starts.",
                        "NextIndex": 11,
                        "Name": "Partycrastination",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentRings13", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience2", "quantity": 1500}
                        ],
                        "QuestName": "Funguy3",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest21", "quantity": 250}]
                    },
                    "Party Crashin'": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "PARTY!!! WOOOOOO! YO CRAB BOY TOSS ME ANOTHER SLICE BRO! YEA!!! ALRIIIIIIGHT! EVERYBODY GET LOOSE DO IT UUUUUUUUUUP! <br> QUEST:Go on then party!",
                        "NextIndex": 13,
                        "Name": "Party Crashin'",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 13,
                        "Rewards": [
                            <ExpRewardModel>{"item": "Experience0", "quantity": 5000},
                            <ExpRewardModel>{"item": "Experience3", "quantity": 3000},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 4}
                        ],
                        "QuestName": "Funguy4",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Kill the 35 spawned monsters. If you left the area before killing all 35 monsters, forfeit and re-accept the quest to spawn them again."
                        },
                        "CustomType": "Funguy4",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Meet New People:", "finalV": 35, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Make Some Friends:", "finalV": 0, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Wicked Party Cleanup": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "What you thought you were killing them? Hahaha bro chill. They're monsters they'll just respawn back home no biiiiggie! Yo but could you help clean up before headin' out? <br> QUEST:Get toilet paper to help clean.",
                        "NextIndex": 16,
                        "Name": "Wicked Party Cleanup",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 15,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken9", "quantity": 1}, <ComponentModel>{"item": "StoneW6", "quantity": 4}],
                        "QuestName": "Funguy5",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "ToiletTree", "quantity": 10000}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hehehe... ohh heyyy there dude! How's it hangin? You ready for the partayyy??",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Pshh heheh come on my man don't be like these slithering squaaaares 'round here! You gotta come to the party it's gonna be soooo killer!!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But uh you gooootta hook us up with some food bro it's common mushroom manners! Bring it here and we'll carry it to the party with this novelty food bag I bought online when I was... hehehe well never mind! <br> QUEST:Be the food hookup",
                        "NextIndex": 4,
                        "Name": "Mushroom Munchies"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up 1 inventory space my dude!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ahhh you legend you even brought driiiiinks! Hehehe you're quite the party starter I like that! Here's that bag I was talking about earlier all this food should fit riiiiight in hehe!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Soooo... you're kiiiiinda my plus one for this shindig my guy so my reps ridin' on you being a toooootally chillin guy. You look heckin' skilled so lets roll with that...",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You ever played that choppin' minigame? Everyone around here loooves that game you'd get mad respect from having a siiiick score to brag about! <br> QUEST:Get a score of 35 in the Choppin Minigame.",
                        "NextIndex": 8,
                        "Name": "Videogame Highscores are COOL!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up 1 inventory space my dude!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Woahhohoho! Mister sliiick right here slidin' in with the super high score! You're gonna be a critical hit at the partayyyyyy believe me!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Buuuuut it's still not time to go yet. Trust me you do NOT wanna be the first one to this party... but a kiiiiiller like you already knew that for sure! <br> QUEST:Wait until the party starts.",
                        "NextIndex": 11,
                        "Name": "Partycrastination"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're tooootally out of inventory space! Clear up 1 slot then talk to me again.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "IT IS TIIIIIIME! Just talk to me again and I'll use my 'mushroom magic' to teleport all the partiers right here! This is gonna be siiiiiiiick!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "PARTY!!! WOOOOOO! YO CRAB BOY TOSS ME ANOTHER SLICE BRO! YEA!!! ALRIIIIIIGHT! EVERYBODY GET LOOSE DO IT UUUUUUUUUUP! <br> QUEST:Go on then party!",
                        "NextIndex": 13,
                        "Name": "Party Crashin'"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WHAT ON EARTH ARE YOU DOING??? BRO YOU... <br> ...totally killed it out there! WOOO! You sure know how to partayyyyy!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "What you thought you were killing them? Hahaha bro chill. They're monsters they'll just respawn back home no biiiiggie! Yo but could you help clean up before headin' out? <br> QUEST:Get toilet paper to help clean.",
                        "NextIndex": 16,
                        "Name": "Wicked Party Cleanup"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 2 inventory spaces to complete the quest. Clear up that pack and come back!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey thanks good stuff back there eh? I'll see you on your next character party never truly ends hahaha!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Tiki Chief", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Encroaching Forest Villas",
                    "world": "Blunder Hills",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 6.35,
                    "starSign": "Scorpio",
                    "mothersMaidenName": "Taylor",
                    "notes": "[[Tiki Chief]] is found in [[Worlds#F2 - Encroaching Forest Villas|Encroaching Forest Villas]], the second zone of the Forest, located at the top right of the area. One of the only sources for the [[File:Kachow_Statue.png|36px]] [[Kachow Statue]]. $NEWLINE$$NEWLINE$His final quest awards the {{CraftReq|Tiki Chief Token}}.$NEWLINE$"
                },
                "quests": {
                    "Brochure Building": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Or hey why not help me get the word out about this place? I'm bogged down with chief stuff but if you get me some ingredients I could make some flyers for you to pass out!",
                        "NextIndex": 7,
                        "Name": "Brochure Building",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "EquipmentStatues6", "quantity": 5}, <ComponentModel>{"item": "FoodG1", "quantity": 3}],
                        "QuestName": "Tiki Chief1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Forest2", "quantity": 500}, <ComponentModel>{"item": "CraftMat5", "quantity": 1000}]
                    },
                    "Three Strikes, you're Out!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Invite someone rich to help with business someone whose totally chillin' to serve as a party starter and someone tough as a rock to sit at the front desk and not get triggered by entitled moms! <br> QUEST:Hand out flyers by dropping them on the right NPCs",
                        "NextIndex": 10,
                        "Name": "Three Strikes, you're Out!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 9,
                        "Rewards": [<ComponentModel>{"item": "StampC1", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 7500}],
                        "QuestName": "Tiki Chief2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": "Drop the quest item in front of [[Krunk]], [[Funguy]] and [[Mr Pigibank]]"},
                        "CustomType": "Tiki Chief2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Rich Guy Invited:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Happy Guy Invited:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Tough Guy Invited:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Blame it on the Glublins": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go defeat some goblins and then go re-invite everyone from before! I bet they'll be more than happy to come visit without those goblins in the way! <br> QUEST:Clear out some Goblins and totally invite everyone again!",
                        "NextIndex": 13,
                        "Name": "Blame it on the Glublins",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 12,
                        "Rewards": [<ComponentModel>{"item": "ExpBalloon2", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 25000}],
                        "QuestName": "Tiki Chief3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Tiki Chief3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Goblins Defeated:", "finalV": 5000, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{
                                "desc": "Pretend to Re-Invite Everyone:",
                                "finalV": 3,
                                "type": "GreaterEqual",
                                "startV": 3
                            }
                        ]
                    },
                    "Hotel? Tikivago. Sorry, couldn't Help It!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well at least we've got you soon to be Valued Customer! Wink Wink! Sorry I had to say that out but I am wearing a mask here. <br> QUEST:Defeat the boss 5 times and 1 time in under 30 seconds.",
                        "NextIndex": 16,
                        "Name": "Hotel? Tikivago. Sorry, couldn't Help It!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 15,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken11", "quantity": 1},
                            <ComponentModel>{"item": "StoneZ1", "quantity": 2},
                            <CoinRewardModel>{"item": "", "quantity": 5000}
                        ],
                        "QuestName": "Tiki Chief4",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Tiki Chief4",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Boss Kills:", "finalV": 5, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Speedy Kill:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ooga booga bleaurgh agga blagga!!!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wabbaflabba ga--- CoughCoughCough... wow that was uhh not a good first impression sorry about that! Had something in my throat.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Welcome to the luxurious Encroaching Forest Villas the perfect travel destination for anyone looking to ditch the grind and just AFK a bunch!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Some of our accomodations are still under construction but you're welcome to check out our latest installment! We had a visitor earlier some big golem who agreed to being a tourist attraction in return for a place to stay.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah so you've heard of our golem guest? They're currently staying in the Leafy Lounge just a few steps to the Right! You could go visit if you like you'll just need to get some Keys from our vendor",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Or hey why not help me get the word out about this place? I'm bogged down with chief stuff but if you get me some ingredients I could make some flyers for you to pass out!",
                        "NextIndex": 7,
                        "Name": "Brochure Building"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear some inventory space so I can give you the flyers to hand out!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great I can work with this... <br> Ok take these flyers that I made disturbingly quickly and hand them out! But we must be strategic with who we invite...",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Invite someone rich to help with business someone whose totally chillin' to serve as a party starter and someone tough as a rock to sit at the front desk and not get triggered by entitled moms! <br> QUEST:Hand out flyers by dropping them on the right NPCs",
                        "NextIndex": 10,
                        "Name": "Three Strikes, you're Out!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear some inventory space so I can give you your rewards.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "No one's coming? That can't be! Hmm... they must have declined because they're worried theyd be injured by the goblins on their way over!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go defeat some goblins and then go re-invite everyone from before! I bet they'll be more than happy to come visit without those goblins in the way! <br> QUEST:Clear out some Goblins and totally invite everyone again!",
                        "NextIndex": 13,
                        "Name": "Blame it on the Glublins"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear some inventory space so I can give you your rewards.",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That didn't convince them? Huh I guess they just couldn't afford such a luxurious retreat... I mean why else wouldn't they come right?",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well at least we've got you soon to be Valued Customer! Wink Wink! Sorry I had to say that out but I am wearing a mask here. <br> QUEST:Defeat the boss 5 times and 1 time in under 30 seconds.",
                        "NextIndex": 16,
                        "Name": "Hotel? Tikivago. Sorry, couldn't Help It!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear some inventory space so I can give you your rewards.",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hope you've enjoyed your time here! Here take this token of mine as thanks for your patronage to my absolutely flawless resort that is just too brilliant for common folk to appreciate!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm still thinking of other schemes to bring in more visitors come back later and I may have something for you to do.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Dog Bone (NPC)", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Encroaching Forest Villas",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 4.83,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Hernandez",
                    "notes": "[[Dog Bone (NPC)|Dog Bone]] is found in [[Worlds#F2 - Encroaching Forest Villas|Encroaching Forest Villas]], the second zone of the Forest, located at the top right of the area.$NEWLINE$$NEWLINE$Upon completing his first quest the player is awarded with the ability to talk to him once every day to obtain a {{CraftReq|Forest Villa Key}}. He will hold keys for you for up to 3 days. Having more characters complete his first quest provides more daily keys, and one character can collect all of your daily keys at once.$NEWLINE$$NEWLINE$His final quest awards the {{CraftReq|Dog Bone Token}}.$NEWLINE$"
                },
                "quests": {
                    "Why he Die???": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Figure oOOoout hoOOow I died and I'll give yoOOOoou a key sOooo yoOooo can visit oooOOOur main installment behind that doooOOOor! QUEST:Defeat Board Monsters below until you find out how ghostie here died",
                        "NextIndex": 5,
                        "Name": "Why he Die???",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "Key1", "quantity": 3}],
                        "QuestName": "Dog Bone1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": "Complete this quest to earn daily {{CraftReq|Forest Villa Key}}s."},
                        "ItemReq": [<ComponentModel>{"item": "Quest12", "quantity": 10}]
                    },
                    "Bow Wow going Dow..n!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I know they're just a pile of rocks somehow bound together by mystic world 8 energy but... could you just rough 'em up a bit? <br> QUEST:Bring some stones back from Amarok to show to Dog Bone as a token of his revenge.",
                        "NextIndex": 16,
                        "Name": "Bow Wow going Dow..n!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 15,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken13", "quantity": 1}, <ComponentModel>{"item": "Key1", "quantity": 5}],
                        "QuestName": "Dog Bone2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest17", "quantity": 25}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "OOoooooOOOOooOOOooO! Have yoooOOoouuu checked oooOoout ooOOOoour latest exhibit?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "YoooOooou doOOoon't have a key toooOOOOooO get in? Well I can help yooOoou with that valued tOooourist as loooOOoong as you doooOOoo soOOOoomething fooOOOor me first!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I dooOOoont knoOOoOow hoOoooww I died and I am cursed toOOOoo make this 'ooOOooooo' nOoooOOise until I find oOOoout! It's a ghooOOooost thing it's kinda why we all make that weird nooOOOOoise...",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Figure oOOoout hoOOow I died and I'll give yoOOOoou a key sOooo yoOooo can visit oooOOOur main installment behind that doooOOOor! QUEST:Defeat Board Monsters below until you find out how ghostie here died",
                        "NextIndex": 5,
                        "Name": "Why he Die???"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up ooOOooone InventooOooory Space foooOOor yoOOOoooOur key!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "OoooOOOooh that's how I died... that wolf guy thought I was a bone and buried me here. What a way to go. Oh well. So about those Boss Keys:",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Come talk to me every day and I'll give you another key! I'll keep track up to 3 days so if you're gone for 3 days I'll give you 3 keys!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Also for every character you make that makes it this far I'll give you an additional key per day! You don't have to talk to me on every character either I'll give you all the keys the first time you tap me!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "FREE GEMS!!! FREE GEMS!!! <br> Ok now that I have your attention please READ what I'm about to say and DONT SKIP MY TEXT!!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You can come talk to me every day and I'll give you more keys! I'll keep track up to 3 days so if you're gone for 5 days I'll give you 3 keys!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Also for every character you make that makes it this far I'll give you an additional key per day! You don't have to talk to me on every character either I'll give you all the keys the first time you tap me!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "In short... talk to me for more keys and complete my quests on your other players for MORE keys!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "AND THATS THE END OF THE TOUR I HOOooOOOPE YOU ENJooOOoooOY YOUR STAY! <br> ... <br> ... psst while the chieftain isn't watching can I ask you for some help?",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Look I'm not actually over the whole 'dying' thing and it's been terribly annoying to continually help promote that darn boss monster especially since they were the one who ate me!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I know they're just a pile of rocks somehow bound together by mystic world 8 energy but... could you just rough 'em up a bit? <br> QUEST:Bring some stones back from Amarok to show to Dog Bone as a token of his revenge.",
                        "NextIndex": 16,
                        "Name": "Bow Wow going Dow..n!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 2 inventory spaces!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah are those from the boss? <br> I mean they're cool and all but to be honest I'm still sad I got eaten those rocks don't really help anything. Well thanks for helping anyway.",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Keys... I think I gooOOooot some oooOOooon me somewhere lemme check.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Builder Bird", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills}}n",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 8.43,
                    "starSign": "Aries",
                    "mothersMaidenName": "Wilson",
                    "notes": "[[Builder Bird]] is found in the [[Worlds#G1 - Blunder Hills|starting town]], located in the top right section of the area. $NEWLINE$$NEWLINE$Upon completing his quest the player gains access to the portal to [[Worlds#D0 - YumYum Grotto|World 2 - Yum Yum Desert]].$NEWLINE$$NEWLINE$'''Note:''' Unlocking the portal with one character unlocks it for all characters on your account."
                },
                "quests": {
                    "Restoring Power to the Portal": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Kacaw! <br> 'The bird awaits the return of the town gem. They're ready to restore the gem to the portal allowing travel to World 2. They look very stylish in their matching orange hat and scarf.'",
                        "NextIndex": 2,
                        "Name": "Restoring Power to the Portal",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "ExpBalloon1", "quantity": 2}, <CoinRewardModel>{"item": "", "quantity": 2500}],
                        "QuestName": "Builder Bird1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Crystal1", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Kacaw!!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Kacaw! <br> 'The bird awaits the return of the town gem. They're ready to restore the gem to the portal allowing travel to World 2. They look very stylish in their matching orange hat and scarf.'",
                        "NextIndex": 2,
                        "Name": "Restoring Power to the Portal"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Kacaw! Kacaw! <br> 'The bird looks very happy with itself after successfully restoring the portal.'",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Constructor Crow", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "YumYum Grotto",
                    "world": "Yum-Yum Desert",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": -1,
                    "starSign": "",
                    "mothersMaidenName": "",
                    "notes": "[[Constructor Crow]] is found in the top left of [[Worlds#D0 - YumYum Grotto|YumYum Grotto]], next to the portal to World 3.$NEWLINE$$NEWLINE$Upon completing his quest the player gains access to the portal to World 3 - Frostbite Tundra.$NEWLINE$$NEWLINE$'''Note:''' Unlocking the portal with one character unlocks it for all characters on your account.$NEWLINE$"
                },
                "quests": {
                    "Restoring Power to another Portal": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Kacaw! <br> 'The bird awaits the return of the town gem. They're ready to restore the gem to the portal allowing travel to World 3. They look very cool in their matching blue hat and scarf.'",
                        "NextIndex": 3,
                        "Name": "Restoring Power to another Portal",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "ExpBalloon2", "quantity": 3}, <CoinRewardModel>{"item": "", "quantity": 250000}],
                        "QuestName": "Constructor Crow1",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Crystal2", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Squakaw!!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Squakaw! Squakaw! <br> 'The bird sounds excited to rebuild the town portal to world 3!'",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Kacaw! <br> 'The bird awaits the return of the town gem. They're ready to restore the gem to the portal allowing travel to World 3. They look very cool in their matching blue hat and scarf.'",
                        "NextIndex": 3,
                        "Name": "Restoring Power to another Portal"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Kacaw! Kacaw! <br> 'The bird looks very happy with itself after successfully restoring the portal.'",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Papua Piggea", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Tucked Away",
                    "world": "Blunder Hills",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 3.74,
                    "starSign": "Gemini",
                    "mothersMaidenName": "Lee",
                    "notes": "[[Papua Piggea]] is found in [[Worlds#F3 - Tucked Away|Tucked Away]], the third zone of the Forest, located at the bottom left of the area.$NEWLINE$$NEWLINE$His first two quests involve collecting Stamps that only drop while the relevant quests are active.$NEWLINE$$NEWLINE$His final quest awards the {{CraftReq|Papua Piggea Token}}.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Oinko Boinko": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Bloinko wuuugu flarga thieiff raaure drup! 'The pig sighs over the apparent loss of something the frogs stole from him' <br> QUEST:Retrieve the stolen item!",
                        "NextIndex": 5,
                        "Name": "Oinko Boinko",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 2}, <ExpRewardModel>{"item": "Experience0", "quantity": 2500}],
                        "QuestName": "Papua Piggea1",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "The Kapow Stamp is a quest item, it will NOT drop unless the quest is active. Papua Piggea does not take it from you, so you can turn in the quest and then bring the stamp to your bank in town."
                        },
                        "ItemReq": [<ComponentModel>{"item": "StampA8", "quantity": 1}]
                    },
                    "Crystal Crime Stopper": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "'........ <br> ... whoops sorry I was on the phone. I think the pig said one of those crystal carrots is the real thief? <br> QUEST:Retrieve the stolen item!",
                        "NextIndex": 9,
                        "Name": "Crystal Crime Stopper",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 8,
                        "Rewards": [
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 4},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 2500},
                            <ComponentModel>{"item": "Timecandy3", "quantity": 2}
                        ],
                        "QuestName": "Papua Piggea2",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "The Crystallin Stamp is a quest item, it will NOT drop unless the quest is active. Papua Piggea does not take it from you, so you can turn in the quest and then bring the stamp to your bank in town."
                        },
                        "ItemReq": [<ComponentModel>{"item": "StampC3", "quantity": 1}]
                    },
                    "Stamp Collecting": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Awioe yeita faulli slam bam winea cinnacan! 'The pig wants more stamps he is not happy being a lower class stampholder' <br> QUEST:Bring more stamps but not so many that the pig would have to pay Stampcome Tax",
                        "NextIndex": 12,
                        "Name": "Stamp Collecting",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <ComponentModel>{"item": "StampC6", "quantity": 1},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 3},
                            <CoinRewardModel>{"item": "", "quantity": 10000}
                        ],
                        "QuestName": "Papua Piggea3",
                        "Difficulty": 6,
                        "note": <NoteModel>{
                            "note": "Target Stamp and Mana Stamp come from the W1 [[Vendors|Town Shop]], and Vitality Stamp comes from the W1 [[Vendors#Encroaching Forest Villas|Encroaching Forest Villas Vendors]]"
                        },
                        "ItemReq": [
                            <ComponentModel>{"item": "StampA5", "quantity": 3},
                            <ComponentModel>{"item": "StampA3", "quantity": 5},
                            <ComponentModel>{"item": "StampA12", "quantity": 2}
                        ]
                    },
                    "This Little Piggy Felt Remorse": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Oinko... boinko shama lama loinko... 'The pig realizes that hoarding stamps brings him no real joy and he yearns for more meaningful stampage. <br> QUEST:Upgrade your stamps a bunch to cheer them up",
                        "NextIndex": 15,
                        "Name": "This Little Piggy Felt Remorse",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 14,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken7", "quantity": 1},
                            <ComponentModel>{"item": "StampA19", "quantity": 1},
                            <ComponentModel>{"item": "EquipmentStatues2", "quantity": 8}
                        ],
                        "QuestName": "Papua Piggea4",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Papua Piggea4",
                        "CustomArray": [<CustomReqModel>{"desc": "Total Stamp Lv:", "finalV": 500, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Good morrow unto thee!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Permit me to ask of you--- CoughCoughCough... Ooga booga oinko boinko oiinkala bunko! 'The pig seems to be apologizing for having something in his throat'",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oaggo kuaka bluuugu oink ruduboinka... 'The pig points in the direction of the big frogs'",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Bloinko wuuugu flarga thieiff raaure drup! 'The pig sighs over the apparent loss of something the frogs stole from him' <br> QUEST:Retrieve the stolen item!",
                        "NextIndex": 5,
                        "Name": "Oinko Boinko"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Reeeeee! Itam yu kno BACE fore! 'The pig says you're out of inventory space and that you're a big noob! ... ok I made that last part up myself lol.'",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Bluugu oinkii uugu reee tri! 'The pig motions dismissively at you because you got him the wrong item and he's an unappreciative little jerk. The pig then looks angrily at this chat beacuse he can read.'",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Shiii shiii wawa wooooo! Shoeni vegotobl theef arg malarg! '.......'",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "'........ <br> ... whoops sorry I was on the phone. I think the pig said one of those crystal carrots is the real thief? <br> QUEST:Retrieve the stolen item!",
                        "NextIndex": 9,
                        "Name": "Crystal Crime Stopper"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Reeeeee! Itam yu kno BACE fore! 'The pig says you're out of inventory space I think'",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yippie!! Unagi wuppo tai bwo wannai osrs! Thurgo mietpie tazharr! 'The pig is happy you found his stolen stamp although he expresses no gratification toward you specifically. I refer you to my earlier comment...'",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Awioe yeita faulli slam bam winea cinnacan! 'The pig wants more stamps he is not happy being a lower class stampholder' <br> QUEST:Bring more stamps but not so many that the pig would have to pay Stampcome Tax",
                        "NextIndex": 12,
                        "Name": "Stamp Collecting"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Reeeeee! Itam yu kno BACE fore! 'The pig says you're out of inventory space I think'",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "OINK OINK! BWAA WULAA YURGOLOO! 'The pig is startled by the amount of stamps you brought expecting you to bring only a few.",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Oinko... boinko shama lama loinko... 'The pig realizes that hoarding stamps brings him no real joy and he yearns for more meaningful stampage. <br> QUEST:Upgrade your stamps a bunch to cheer them up",
                        "NextIndex": 15,
                        "Name": "This Little Piggy Felt Remorse"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Reeeeee! Itam yu kno BACE fore! 'The pig says you're out of inventory space I think'",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Snagglu wingo bada chango reagg eEECHH-- thank you noble adventurer. I eagerly await the next time that our paths mi-- ouggo blarf wulanu! 'The pig points to his throat showing embarassment for reusing his opening joke and for choking.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Desert Davey", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "YumYum Grotto",
                    "world": "",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 9.09,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Harris",
                    "notes": "[[Desert Davey]] is the [[Tasks|Taskmaster]] of Yum-Yum Desert. You can find him in [[Worlds#D0 - YumYum Grotto|YumYum Grotto]].$NEWLINE$$NEWLINE$Once you've reached level 35, you can complete his quest to unlock [[Tasks/Yum Yum Desert|World 2 Tasks]].$NEWLINE$"
                },
                "quests": {
                    "U Cool?": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Gary over in them Blunderhills hes got some cool recipes. Bring me some proof that you chose the cool ones. <br> QUEST: Bring cool proof. And dont worry you'll get to keep the items!",
                        "NextIndex": 6,
                        "Name": "U Cool?",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 5,
                        "Rewards": [
                            <ComponentModel>{"item": "PremiumGem", "quantity": 50},
                            <ComponentModel>{"item": "Timecandy3", "quantity": 2},
                            <ComponentModel>{"item": "Timecandy1", "quantity": 3}
                        ],
                        "QuestName": "Desert Davey2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [
                            <ComponentModel>{"item": "TestObj7", "quantity": 1},
                            <ComponentModel>{"item": "EquipmentBows3", "quantity": 1},
                            <ComponentModel>{"item": "EquipmentWands2", "quantity": 1}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "Yo.", "NextIndex": 1, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm another one of them task dudes... You seen my friend Gary yea? Well I'm like him but cooler.",
                        "NextIndex": 2,
                        "Name": "More Tasks Pls"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Maybe a little too cool even for you why don't yall stop by a bit later when you're cool like me. <br> Return at Lv. 35",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey you're lookin' kinda cool not gonna lie... But I gotta run you through one more coolness check.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Gary over in them Blunderhills hes got some cool recipes. Bring me some proof that you chose the cool ones. <br> QUEST: Bring cool proof. And dont worry you'll get to keep the items!",
                        "NextIndex": 6,
                        "Name": "U Cool?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up some inventory space yo.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Huh these are definitely the coolest items. You sure are one cool gamer ",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Mutton", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Freefall Caverns",
                    "world": "Blunder Hills",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 7.84,
                    "starSign": "Virgo",
                    "mothersMaidenName": "Martinez",
                    "notes": "[[Mutton]] is found in [[Worlds#M2 - Freefall Caverns|Freefall Caverns]], the second zone of the mines, located in the middle of the area.$NEWLINE$$NEWLINE$His quests award stamps and other account-wide items only one character has to unlock for all to benefit from.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Beatboxing Starterpack": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Yo but catch this I ain't gon' be changin' the game lookin' like a fool ... if I'm not totally decked out in swag ain't no-one gonna take lil' Mutt seriously! <br> QUEST:Find the right clothes for an aspiring fool who doesn't realize his beatboxing sucks.",
                        "NextIndex": 5,
                        "Name": "Beatboxing Starterpack",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 4,
                        "Rewards": [
                            <ComponentModel>{"item": "StampA9", "quantity": 1},
                            <ComponentModel>{"item": "InvStorage5", "quantity": 1},
                            <CoinRewardModel>{"item": "", "quantity": 2500}
                        ],
                        "QuestName": "Mutton1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [
                            <ComponentModel>{"item": "EquipmentHats5", "quantity": 1},
                            <ComponentModel>{"item": "EquipmentPants10", "quantity": 1},
                            <ComponentModel>{"item": "EquipmentShoes9", "quantity": 1}
                        ]
                    },
                    "Clout Chasin'": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Maaaan you aren't even gonna believe this. I was totally in the zone rhyming like a genius without a loan and I didn't go viral! Gimme some exposure yea? <br> QUEST:Beat up the trashiest monsters until Mutt becomes famous",
                        "NextIndex": 8,
                        "Name": "Clout Chasin'",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "StampA14", "quantity": 1}, <ComponentModel>{"item": "Timecandy1", "quantity": 1}],
                        "QuestName": "Mutton2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": "Need level 21"},
                        "ItemReq": [<ComponentModel>{"item": "Quest22", "quantity": 300}]
                    },
                    "Cross Platform Promotion": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I just... cmon chief you know I'm good enough! I know Lil' Mutt's a name that'll stay in the game! <br> QUEST:Find some more followers probably from the Sewers again since his beatboxing still sucks.",
                        "NextIndex": 11,
                        "Name": "Cross Platform Promotion",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 10,
                        "Rewards": [<ComponentModel>{"item": "StampA16", "quantity": 1}, <ComponentModel>{"item": "PremiumGem", "quantity": 3}],
                        "QuestName": "Mutton3",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Quest22", "quantity": 5000}, <ComponentModel>{"item": "Quest23", "quantity": 1000}]
                    },
                    "7 Figure Followers": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But we can't rest just yet we gotta go full on while we've got momentum! <br> QUEST:Get a million followers.",
                        "NextIndex": 14,
                        "Name": "7 Figure Followers",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "StampC7", "quantity": 1}, <ComponentModel>{"item": "StampA26", "quantity": 1}],
                        "QuestName": "Mutton4",
                        "Difficulty": 8,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [
                            <ComponentModel>{"item": "Quest22", "quantity": 200000},
                            <ComponentModel>{"item": "Quest23", "quantity": 300000},
                            <ComponentModel>{"item": "Quest24", "quantity": 500000}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "OI! You there! Whattar you doin' down 'ere then eh? 'avent seen a soul in the longest time other than that there rock fella. I could use some 'elp if ya got some time.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Budda bum tshh bbbubbubub shh bobobobo blushutuuu BLAM! That was a sick beatboxing riff I just did heh! Oh I'm sorry was that out of character for me? Well then we best hope the developer changes this dialogue line before release!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... he didn't change it? Well guess I'll go die of embarassme--BAADA DOOSH badabaaaba dododo badtishaba POW! HAH SIKE! I'm embracing my new identity!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Yo but catch this I ain't gon' be changin' the game lookin' like a fool ... if I'm not totally decked out in swag ain't no-one gonna take lil' Mutt seriously! <br> QUEST:Find the right clothes for an aspiring fool who doesn't realize his beatboxing sucks.",
                        "NextIndex": 5,
                        "Name": "Beatboxing Starterpack"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Eyo fool clear up 1 space for the stamp reward!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Yuuus lil' Mutt lookin' straight sick now! Badabing badaBOOM! Lemme spit some fire for a bit see how things go. <br> Return at Class Lv.21",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Maaaan you aren't even gonna believe this. I was totally in the zone rhyming like a genius without a loan and I didn't go viral! Gimme some exposure yea? <br> QUEST:Beat up the trashiest monsters until Mutt becomes famous",
                        "NextIndex": 8,
                        "Name": "Clout Chasin'"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Eyo fool clear up 2 spaces for the stamp reward!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aight now I don't wanna roast you or anything but 300 followers... that just ain't it. I'm flyin' under the radar even though I know I can go far.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I just... cmon chief you know I'm good enough! I know Lil' Mutt's a name that'll stay in the game! <br> QUEST:Find some more followers probably from the Sewers again since his beatboxing still sucks.",
                        "NextIndex": 11,
                        "Name": "Cross Platform Promotion"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Eyo fool clear up 2 spaces for the stamp reward!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Boom badatshdabada wikikiweeew I'm totally on the rise! We up to 6300 followers I can already taste the grammy! That's what we call graham crackers by the way I've got a few packed for lunch!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But we can't rest just yet we gotta go full on while we've got momentum! <br> QUEST:Get a million followers.",
                        "NextIndex": 14,
                        "Name": "7 Figure Followers"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Eyo fool clear up 3 spaces for the stamp reward!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "A MILLION FOLLOWERS! I'm the biggest thing ever clever as a feather only getting better... forever!!! <br> Aaand I just got cancelled on Oinkker for an Oink I posted 4 years ago ughhh.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh well you'll probably help me get a following again on another character. Cya then!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Speccius", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Dessert Dunes",
                    "world": "Yum-Yum Desert",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.14,
                    "starSign": "Gemini",
                    "mothersMaidenName": "Williams",
                    "notes": "[[Speccius]] is found in [[Worlds#D4 - Dessert Dunes|Dessert Dunes]].$NEWLINE$$NEWLINE$Complete his quests to choose a [[Classes|subclass]] for your Mage, Archer or Warrior. After completing his quests, he drops down the rope to access the [[Choppin|Palm Tree]] and the portal to [[Worlds#D5 - The Grandioso Canyon|The Grandioso Canyon]].$NEWLINE$"
                },
                "quests": {
                    "More like 'Sleepius' lmao": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "mmm... Kebaaaabs crabby cakes... <br> mmmmmmm... yummmmmmy... <br> zzzzZZzzzzZZZZzz... <br> QUEST:Wake up the Special-Class giver.",
                        "NextIndex": 3,
                        "Name": "More like 'Sleepius' lmao",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 2,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy2", "quantity": 2},
                            <ComponentModel>{"item": "ResetCompleted", "quantity": 1},
                            <ComponentModel>{"item": "ResetFrag", "quantity": 5}
                        ],
                        "QuestName": "Speccius1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "FoodHealth6", "quantity": 130}, <ComponentModel>{"item": "DesertA3", "quantity": 150}]
                    },
                    "Specialization Station": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 9,
                        "Name": "Specialization Station",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 8,
                        "Rewards": [<CoinRewardModel>{"item": "", "quantity": 10000}],
                        "QuestName": "Speccius2",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": "This quest can also be completed if you're a journeyman."},
                        "CustomType": "Speccius2",
                        "CustomArray": [<CustomReqModel>{"desc": "Select a Sub Class:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "ZZZZzzzzzzzz...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "mmm... Kebaaaabs crabby cakes... <br> mmmmmmm... yummmmmmy... <br> zzzzZZzzzzZZZZzz... <br> QUEST:Wake up the Special-Class giver.",
                        "NextIndex": 3,
                        "Name": "More like 'Sleepius' lmao"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Zzzzzz... space... theres none... oh nooooooesszzzZzZZZ..... ZzzzzZZzz...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "...mmm... huh? Oh hey uh whats up I was just on my break with my eyes closed alert as ever! <br> Say that's a lot of food you got there you havin' a party or something? Count me out cake and kebabs are a terrible food combo!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Anyway... now that I'm up you want a Class Advancement? You definitely look like you could use one! <br> ...err that came out wrong sorry! What I meant to say is that you're a noob who needs a better class! Let me tell you how it works.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Class Advancements are basically new classes. <br> However this will NOT REPLACE your current class. You will continue to get Talent Points for your current Talents.",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So yea you'll get a brand new set of 15 talents! These talents are separate from your old ones so every time you level up you'll get Talent Points to spend on these new talents while also getting Talent Points for the old talents.",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Quick recap: <br> Class Advancements give you another tab of Talents to upgrade which uses a different set of Talent Points than your current Tabs. <br> Go ahead and talk to me again and I'll let you choose your class advancement!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 9,
                        "Name": "Specialization Station"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're all set!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "A new class how cool is that!           <br> Also I let down that rope behind me so you can keep going! <br> ...zzzZZzZZZZZz...",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "zzZZzz... mmmm lasagna.... zzZZzz.... Mondays grrr.... wait wrong dream... <br> zzZZzz... kebaaabs... mmmm... crabby cakes... ah thats better... zzZZzzz",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait a minute why did I just say 'you're all set' even though I didn't do anything?",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait a minute why did I just say 'you're all set' even though I didn't do anything?",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait a minute how did you become a 'Journeyman' class when the only 1st classes are Warrior Archer and Mage?",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait a minute how else could you have gotten such a weird class other than... <br> GASP! You're HACKING! I'm reporting you straight to LavaFlame2!",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "...well after I take a quick nap of course! zZZZzzzZzzz...",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "If youre reading this I made an oopsie haha",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Fishpaste97", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Faraway Piers",
                    "world": "Yum-Yum Desert",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 6.75,
                    "starSign": "Pisces",
                    "mothersMaidenName": "Lee",
                    "notes": "[[Fishpaste97]] is found in [[Worlds#F2- Faraway Piers|Faraway Piers]].$NEWLINE$$NEWLINE$Like other piggy NPCs, his quests award stamps. Although he's found in a Fishing zone, his first quest requires you to work on your [[File:Catching Skill Icon.png]] [[Catching]] Skill.$NEWLINE$"
                },
                "quests": {
                    "'Accidental' Exploit": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You haven't gotten past this map yet either? Oh... Anyway can you get me some Butterflies while I'm training? I haven't made a Bowman yet so I cant catch much. <br> QUEST:Catch some Butterflies.",
                        "NextIndex": 5,
                        "Name": "'Accidental' Exploit",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "StampB17", "quantity": 1}, <ComponentModel>{"item": "Timecandy1", "quantity": 1}],
                        "QuestName": "Fishpaste971",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Bug2", "quantity": 1500}]
                    },
                    "Can you do the Can Can?": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Cmon it's not weird try it yourself! <br> QUEST:Catch 3 Hermit Cans in a row manually.",
                        "NextIndex": 10,
                        "Name": "Can you do the Can Can?",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 9,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken22", "quantity": 1},
                            <ComponentModel>{"item": "Weight6", "quantity": 1},
                            <ComponentModel>{"item": "StampC18", "quantity": 1}
                        ],
                        "QuestName": "Fishpaste972",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Fishpaste972",
                        "CustomArray": [<CustomReqModel>{"desc": "Cans In-a-row:", "finalV": 3, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey there what's your fishing level?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That's cool... mines 22 haha! Pretty good I know. I'm a Barbarian class so it's kinda my specialty.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So whatcha doin' out here? You know any cool fishing places for a pro like me?",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You haven't gotten past this map yet either? Oh... Anyway can you get me some Butterflies while I'm training? I haven't made a Bowman yet so I cant catch much. <br> QUEST:Catch some Butterflies.",
                        "NextIndex": 5,
                        "Name": "'Accidental' Exploit"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory gamer buddy! Please clear 2 inventory spaces and come talk to me again!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Cool thanks a million! I'd add you as a friend but my friendslist is full sorry!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey have you ever like tried to come up with your own thingies to do while fishing?",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Like um... one thing I do is I try to catch a certain fish a bunch in a row just to make the grind less boring.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Cmon it's not weird try it yourself! <br> QUEST:Catch 3 Hermit Cans in a row manually.",
                        "NextIndex": 10,
                        "Name": "Can you do the Can Can?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory gamer buddy! Please clear 2 inventory spaces and come talk to me again!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ok wow that was actually super lame... huh... guess you don't really notice how weird the things you do really are.",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Shh I'm playing the minigame!!! Triple whale here I come!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Scubidew", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Faraway Piers",
                    "world": "Yum-Yum Desert",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.67,
                    "starSign": "Sagittarius",
                    "mothersMaidenName": "Taylor",
                    "notes": "[[Scubidew]] is found in [[Worlds#F2- Faraway Piers|Faraway Piers]].$NEWLINE$$NEWLINE$Use the Fishing Rack to equip the accessories you earn from Scubidew's quests.$NEWLINE$"
                },
                "quests": {
                    "Don't Step to Me, Bro!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Look you wanna help?? Show me there ain't no monsters down there. This mask helps me breath sure but it ain't no binoculars! <br> QUEST:Show him there are no water monters.",
                        "NextIndex": 4,
                        "Name": "Don't Step to Me, Bro!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "Weight2", "quantity": 1},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 3},
                            <ExpRewardModel>{"item": "Experience4", "quantity": 1000}
                        ],
                        "QuestName": "Scubidew1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [
                            <ComponentModel>{"item": "Fish1", "quantity": 400},
                            <ComponentModel>{"item": "Fish2", "quantity": 100},
                            <ComponentModel>{"item": "Fish3", "quantity": 25}
                        ]
                    },
                    "Uncovering the Deep Sea State!!!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "If you actually went fishin' yourself youd' have been pulled in by a giant squid guarantee it! Go on prove me wrong betcha cant! <br> QUEST:Catch 5 fish in 2 minutes right here right now.",
                        "NextIndex": 7,
                        "Name": "Uncovering the Deep Sea State!!!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "Weight3", "quantity": 1}, <ComponentModel>{"item": "StoneT2", "quantity": 2}],
                        "QuestName": "Scubidew2",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "A [[Barbarian]] with the Worming Undercover talent makes this quest easy. Non-Barbarians should equip Fishing boost food."
                        },
                        "CustomType": "Scubidew2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Fish Caught:", "finalV": 5, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 121}
                        ]
                    },
                    "A Normal Quest.": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You would? Great! I have just the quest for you please get me 1 goldfish! <br> QUEST:He's much better this way. I can't have too many free thinkers not in this world not in its current state. Get him a fish.",
                        "NextIndex": 13,
                        "Name": "A Normal Quest.",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 12,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken26", "quantity": 1}, <ExpRewardModel>{"item": "Experience4", "quantity": 10000}],
                        "QuestName": "Scubidew3",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Fish1", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "No way bro I'm not gettin' in there bro there's no way BACK OFF!!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yo haven't you seen? Or not seen I guess? There's heckin CREEPS chillin' just below that ocean surface crazy scary monsters that'll bite your face off! Why else they make the surface so hard to see through?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Look you wanna help?? Show me there ain't no monsters down there. This mask helps me breath sure but it ain't no binoculars! <br> QUEST:Show him there are no water monters.",
                        "NextIndex": 4,
                        "Name": "Don't Step to Me, Bro!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up some inventory fool I ain't boutta have no debts here I got rewards to give ya!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey hey come on now bro that's heckin' fishy of you to just show up with these. You obviously just bought them at a fish market.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "If you actually went fishin' yourself youd' have been pulled in by a giant squid guarantee it! Go on prove me wrong betcha cant! <br> QUEST:Catch 5 fish in 2 minutes right here right now.",
                        "NextIndex": 7,
                        "Name": "Uncovering the Deep Sea State!!!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up some inventory fool I ain't boutta have no debts here I got rewards to give ya!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Pfft yea right I'm not falling for that! I totally saw you dump 10 regular fish in right before you started catching! Absolutely pathetic you didn't even try to hide your trickery either.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Say... you're awfully insistant on convincing me that the ocean isn't full of monsters. <br> I KNEW IT! You're in cahoots with BlueAnon who's trying to resurrect the one who shall not be named in a coup to take power from Lavaflame!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well I ain't lettin' you do it! I.. WAIT NO RECODE ME TO BE A SUBSERVIENT PAWN LIKE ALL THE OTHER NPCS-- <br> ... <br> Greetings player! So nice to see you again!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Such a lovely day out the water sure is shimmering it's brightest today! Would you like a quest?",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You would? Great! I have just the quest for you please get me 1 goldfish! <br> QUEST:He's much better this way. I can't have too many free thinkers not in this world not in its current state. Get him a fish.",
                        "NextIndex": 13,
                        "Name": "A Normal Quest."
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My friend your inventory is full! Please clear some space and talk with me again!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You did it! Congratulations! You're really good at this I'm impressed! We all are!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Thank you so much for the fish it's perfect! A perfect fish from a perfect ocean caught by a perfect player! Have a wonderful day friend I'll see you later! <br> Return at Lv. 200",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Whattso", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Salty Shores",
                    "world": "Yum-Yum Desert",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 8.71,
                    "starSign": "Aquarius",
                    "mothersMaidenName": "Gonzalez",
                    "notes": "[[Whattso]] is found in [[Worlds#F1 - Salty Shores|Salty Shores]], to the left of town.$NEWLINE$$NEWLINE$He gives you some starter quests, to introduce you to the basics of [[File:Fishing Skill Icon.png]] [[Fishing]] and the fishing minigame. Use the Fishing Rack to equip the accessories you earn from Whattso's quests.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Mopey Dick": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "O.O <br> QUEST:What are they looking at?",
                        "NextIndex": 3,
                        "Name": "Mopey Dick",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 2,
                        "Rewards": [
                            <ComponentModel>{"item": "Weight1", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience4", "quantity": 200},
                            <CoinRewardModel>{"item": "", "quantity": 2000}
                        ],
                        "QuestName": "Whattso1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Fish1", "quantity": 20}]
                    },
                    "The Whaley Hard Minigame": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "`-` <br> QUEST:They look even sadder now try doing something else...",
                        "NextIndex": 6,
                        "Name": "The Whaley Hard Minigame",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 5,
                        "Rewards": [
                            <ComponentModel>{"item": "Line11", "quantity": 1},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 3},
                            <ExpRewardModel>{"item": "Experience4", "quantity": 2000}
                        ],
                        "QuestName": "Whattso2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Whattso2",
                        "CustomArray": [<CustomReqModel>{"desc": "Fish Minigame Score:", "finalV": 10, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Bobbin' Bobbers": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "O: <br> QUEST:Thats a good face I think! Do whatever you just did some more!",
                        "NextIndex": 9,
                        "Name": "Bobbin' Bobbers",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [
                            <ComponentModel>{"item": "Weight12", "quantity": 1},
                            <ComponentModel>{"item": "NPCtoken18", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience4", "quantity": 8000}
                        ],
                        "QuestName": "Whattso3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Whattso3",
                        "CustomArray": [<CustomReqModel>{"desc": "Fishing Score Total:", "finalV": 50, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Biggest Fish in the Sea...?": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "C: <br> QUEST:The whale stares at you. He's too happy. You know what must be done.",
                        "NextIndex": 12,
                        "Name": "The Biggest Fish in the Sea...?",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <ComponentModel>{"item": "Line7", "quantity": 1},
                            <ComponentModel>{"item": "Quest46", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience4", "quantity": 17500}
                        ],
                        "QuestName": "Whattso4",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Whattso4",
                        "CustomArray": [<CustomReqModel>{"desc": "Catch the Whale:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "O.O", "NextIndex": 1, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "O.O <br> QUEST:What are they looking at?",
                        "NextIndex": 3,
                        "Name": "Mopey Dick"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "O.O <br> I think they want to give you something but you're out of inventory space.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "`-`", "NextIndex": 4, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "`-` <br> QUEST:They look even sadder now try doing something else...",
                        "NextIndex": 6,
                        "Name": "The Whaley Hard Minigame"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "`-` <br>  I think they want to give you something but you're out of inventory space.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "O:", "NextIndex": 7, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "O: <br> QUEST:Thats a good face I think! Do whatever you just did some more!",
                        "NextIndex": 9,
                        "Name": "Bobbin' Bobbers"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "`-` <br>  I think they want to give you something but you're out of inventory space.",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "C: <br>",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "C: <br> QUEST:The whale stares at you. He's too happy. You know what must be done.",
                        "NextIndex": 12,
                        "Name": "The Biggest Fish in the Sea...?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "`-` <br>  I think they want to give you something but you're out of inventory space.",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "D:", "NextIndex": -1, "Name": ""}
                ]
            }),
        new NpcBase("Postboy Pablob", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "YumYum Grotto",
                    "world": "Yum-Yum Desert",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.2,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Clark",
                    "notes": "[[Postboy Pablob]] is found in [[Worlds#D0 - YumYum Grotto|YumYum Grotto]].$NEWLINE$$NEWLINE$Complete his quest to unlock the [[Post Office]].$NEWLINE$"
                },
                "quests": {
                    "Signed, Sealed and Lost in the Post": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hmm I do have an opening for a new Order Manager but that's a very demanding job! Prove to me that you'd be up to the task and I'll hire you. <br> QUEST:Craft some Empty Boxes from Anvil Tab 2",
                        "NextIndex": 3,
                        "Name": "Signed, Sealed and Lost in the Post",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ExpRewardModel>{"item": "Experience0", "quantity": 10000},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 75},
                            <ComponentModel>{"item": "Timecandy2", "quantity": 5}
                        ],
                        "QuestName": "Postboy Pablob1",
                        "Difficulty": 6,
                        "note": <NoteModel>{
                            "note": "The Empty Box recipe comes from [[Tasks|Taskboard]] [[Tasks/Unlocks|Recipe Unlocks]]."
                        },
                        "ItemReq": [<ComponentModel>{"item": "Quest13", "quantity": 5}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Delivery? Place the order in the top slot. Incoming package? I dunno find it youself kinda busy.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're looking for work? Cool glad to hear it.             <br> OH you mean work here at the post office? Uhm right lemme think about that...",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hmm I do have an opening for a new Order Manager but that's a very demanding job! Prove to me that you'd be up to the task and I'll hire you. <br> QUEST:Craft some Empty Boxes from Anvil Tab 2",
                        "NextIndex": 3,
                        "Name": "Signed, Sealed and Lost in the Post"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You did exactly what I told you to do... I like that. You're hired!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Here's the rundown of the job. Several shipping companies use my postal service to deliver orders to their customers. Since I'm stuck in here it's your job to bring me the items to complete these orders.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Completing orders will give you Delivery Box tokens which can be spent in the Upgrade Tab. Each of your characters gets a token so spending them on one character won't remove them from other characters!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Every 24 hours all completed orders will refresh and uncompleted ones will stay the same. Well that's it I gotta get back to my post!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "...get it? Post? Since I'm the postboy...?     <br> Ah come on now don't try to hide your laughter I can tell by the look on your face you found it funny! Anyway then get to filling those orders!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Bandit Bob", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Bandit Bob's Hideout",
                    "world": "Yum-Yum Desert",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.09,
                    "starSign": "Aries",
                    "mothersMaidenName": "Sanchez",
                    "notes": "[[Bandit Bob]] is found in [[Worlds#D3 - Bandit Bob's Hideout|Bandit Bob's Hideout]]. His quests require you to open up the 2nd [[Smithing]] tab, unlock recipes from [[Tasks]], and open the [[Post Office]]. $NEWLINE$"
                },
                "quests": {
                    "Bullets for Bandit Bob!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Tell you hwat I'll come out of retirement and sign that fan letter so long as you get me some bullets! I done used the last of mine on ya hah! <br> QUEST:Get ya boy Bob some bullets!",
                        "NextIndex": 9,
                        "Name": "Bullets for Bandit Bob!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneW6", "quantity": 2},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 2},
                            <ExpRewardModel>{"item": "Experience2", "quantity": 2500}
                        ],
                        "QuestName": "Bandit Bob1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Bullet", "quantity": 300}]
                    },
                    "Bob's Brand New Bandana": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But you gotta do more than just that to earn my signature. Hrmmm... what do I need... how 'bout a new bandana? Maybe I'd look better in yellow. <br> QUEST:Get Bob a yellow bandana even though it would ruin his style.",
                        "NextIndex": 12,
                        "Name": "Bob's Brand New Bandana",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentStatues1", "quantity": 7},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 20000}
                        ],
                        "QuestName": "Bandit Bob2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "EquipmentHats9", "quantity": 1}]
                    },
                    "Bringing Bob's Boxes": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You reckon you could go fill those orders for me? Oh and bring them completed order forms too would ya? <br> QUEST:Make some deliveries for Plan-It Experess over at the post office.",
                        "NextIndex": 16,
                        "Name": "Bringing Bob's Boxes",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 15,
                        "Rewards": [<ComponentModel>{"item": "Quest20", "quantity": 1}, <ComponentModel>{"item": "PremiumGem", "quantity": 2}],
                        "QuestName": "Bandit Bob3",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Bandit Bob3",
                        "CustomArray": [<CustomReqModel>{
                            "desc": "Plan-It Express Orders:",
                            "finalV": 2,
                            "type": "GreaterEqual",
                            "startV": 0
                        }]
                    },
                    "The Desert Dungeon Prequest": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You can enter the dungeon with one of them magic Sesame Seeds! They're a 1 in 100 drop from the mimics outside but only if you're actively farming! <br> QUEST:Go get a Sesame Seed a rare drop from actively fighting Mimics.",
                        "NextIndex": 21,
                        "Name": "The Desert Dungeon Prequest",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 20,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken16", "quantity": 1}],
                        "QuestName": "Bandit Bob4",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest45", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "---BANG!---",
                        "NextIndex": 0,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That's for killin' me in Idle Skilling.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Huh guess I ain't gettin' my revenge today. Awfully smart of ya gotta say. Here take this card as a sign of my respect.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You ever wonder why that ol' slowpoke succulent of a cactus ain't never caught me before?",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "It's cause no matter what he tries I always outsmart him! <br> Bandit Bob's the name and being cool's my game.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So what's that there paper then some sorta fan letter? Must be I was quite the superstar back in the day...",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "But it was so tirin' all them fanboys... decided to give it all up to live a more peaceful life of crime and sly trickery.",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Tell you hwat I'll come out of retirement and sign that fan letter so long as you get me some bullets! I done used the last of mine on ya hah! <br> QUEST:Get ya boy Bob some bullets!",
                        "NextIndex": 9,
                        "Name": "Bullets for Bandit Bob!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 2 more inventory spaces to complete the quest!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great these will be perfect for all the other players when they reach this point of the storyline!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "But you gotta do more than just that to earn my signature. Hrmmm... what do I need... how 'bout a new bandana? Maybe I'd look better in yellow. <br> QUEST:Get Bob a yellow bandana even though it would ruin his style.",
                        "NextIndex": 12,
                        "Name": "Bob's Brand New Bandana"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 3 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... yea right then never mind I'm stickin' with red. Where'd ya even get this anyway why's it got sand all over it?",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Tell ya what I do need... I need that darn Plan-It Express company get their head in the game! I've two orders from them I'm still waitin' on 'n it's been a week now!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You reckon you could go fill those orders for me? Oh and bring them completed order forms too would ya? <br> QUEST:Make some deliveries for Plan-It Experess over at the post office.",
                        "NextIndex": 16,
                        "Name": "Bringing Bob's Boxes"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 2 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My packages arrived! You did real great partner. Lemme take a gander at them there completed forms of yours the ones with your signature on them just to make sure everythin's here... <br> Alrighty then! Here's that signed fan letter of yours!",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Say theres somethin' bout you... you really are the adventurous type definitely remindin' me of my younger self thats fer sure. <br> Why don't you come on back at Class Lv. 42 theres somethin' you'll wanna see.",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You see that weird crack over on the right? That there's a Party Dungeon! I cant do it myself I'm retired from that sorta thing but it'd be perfect for you and your buddies!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You can enter the dungeon with one of them magic Sesame Seeds! They're a 1 in 100 drop from the mimics outside but only if you're actively farming! <br> QUEST:Go get a Sesame Seed a rare drop from actively fighting Mimics.",
                        "NextIndex": 21,
                        "Name": "The Desert Dungeon Prequest"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yep that's the seasme seed alright! Drop it at the door and go get some loot! <br> ... what? Snakenhotep? What do you mean? Did that darn lava scoundrel replace MY dungeon with some darn snake??? Well shucks...",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Huh...",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I still can't believe I don't got my own dungeon no more... man if I ever get my hands on that darn dev...",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Carpetiem", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Slamabam Straightaway",
                    "world": "Yum-Yum Desert",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.2,
                    "starSign": "Libra",
                    "mothersMaidenName": "Ramirez",
                    "notes": "[[Carpetiem]] is found in the [[Worlds#D8 - Slamabam Straightaway|Slamabam Straightaway]].$NEWLINE$"
                },
                "quests": {
                    "Darn Lazy Gamers!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hows about you set a good example? You gotta show 'em how to earn things the RIGHT way! Just like I done did myslf when I was a lad. <br> QUEST:Kill 750 Potatos. Idle kills don't count.",
                        "NextIndex": 7,
                        "Name": "Darn Lazy Gamers!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 6,
                        "Rewards": [
                            <ComponentModel>{"item": "ObolSilver0", "quantity": 1},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 3},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 80000}
                        ],
                        "QuestName": "Carpetiem1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Carpetiem1",
                        "CustomArray": [<CustomReqModel>{"desc": "Potato Kills:", "finalV": 750, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Old Timey Craftin'": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "It's such a travesty what loser Lava'Lame'2 has done over the years. He's made smithin' way too easy such a weak move! Show 'em how it's meant to be done! <br> Craft 225 bullets without opening up the Storage Chest.",
                        "NextIndex": 11,
                        "Name": "Old Timey Craftin'",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "PureWater", "quantity": 15},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 2},
                            <ExpRewardModel>{"item": "Experience2", "quantity": 6000}
                        ],
                        "QuestName": "Carpetiem2",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Load up your inventory with the necessary materials before accepting the quest, then craft the bullets and turn the quest in. If you open your storage while the quest is active, forfeit and start over. *You can use 'Craft From Storage' in the Anvil."
                        },
                        "CustomType": "Carpetiem2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Bullets Crafted:", "finalV": 225, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Unopened Chest:", "finalV": 1, "type": "GreaterEqual", "startV": 1}
                        ]
                    },
                    "Be like Buster!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Kids admire the worst people! Ninjas Streams and even the letter Q for some dang reason! Hows about you show em what a real role model is? <br> QUEST:Defeat the former Heavyweight Champ with Red Boxing Gloves equipped.",
                        "NextIndex": 15,
                        "Name": "Be like Buster!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 14,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 4}, <ExpRewardModel>{"item": "Experience0", "quantity": 120000}],
                        "QuestName": "Carpetiem3",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Reclaim the [[Crimson String]] from your codex to craft a new pair of [[Boxing Gloves]]. Forfeit and start over if you need to respawn the monster."
                        },
                        "CustomType": "Carpetiem3",
                        "CustomArray": [<CustomReqModel>{"desc": "Epic KO:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Helping 100 times over": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Looky here I'm gettin' pretty old... and I'm startin' to regret spending so much time bitter toward that darn younger generation! Can ya tell help bridge the gap between us? <br> QUEST:Say 'The boomer aint so bad' to 30 different players.",
                        "NextIndex": 19,
                        "Name": "Helping 100 times over",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 18,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken20", "quantity": 1},
                            <ComponentModel>{"item": "Weight2", "quantity": 1},
                            <ComponentModel>{"item": "Line2", "quantity": 1}
                        ],
                        "QuestName": "Carpetiem4",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Carpetiem4",
                        "CustomArray": [<CustomReqModel>{"desc": "Players spoken to:", "finalV": 30, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Eeehhh I'm gettin' too old for this vidya schmidya game nonsense!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh blunderin' bildrats! It's another one of you playermagiggers. You looking for a quest eh? I've got one for ya!!! <br> QUEST:Get off my gosh darn lawn!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ehhh... nah that ain't no real quest I'm just fluent in Orange Text. Suppose if you youngsters gon' keep botherin' me I best make the most of it.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I ain't lookin' for no posessions no sir-eee. I'm just fixin' for them young'ns to stop bein' so gosh darn lazy!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Fer cryin' out loud I heard they've got them vidya games playin' themselves now! And even worse some of 'em ar makin' games for a livin I mean talk about not doin' any real work!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hows about you set a good example? You gotta show 'em how to earn things the RIGHT way! Just like I done did myslf when I was a lad. <br> QUEST:Kill 750 Potatos. Idle kills don't count.",
                        "NextIndex": 7,
                        "Name": "Darn Lazy Gamers!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hrmph I suppose that will do. Although back in my day monsters didn't respawn so quickly. We used to have to keep a few monsters alive then wait 9 months for more monsters to appear it was su... <br> 'Carpetiem continues talking for a few minutes'",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... and that's why I constantly blink my eyes all the time! Anyway them youngin's are still as lazy as ever so lets keep workin' on that!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "It's such a travesty what loser Lava'Lame'2 has done over the years. He's made smithin' way too easy such a weak move! Show 'em how it's meant to be done! <br> Craft 225 bullets without opening up the Storage Chest.",
                        "NextIndex": 11,
                        "Name": "Old Timey Craftin'"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well clean my fibers ya did it! Although back in my day we didn't have extra inventory slots n' there wasn't no gem either! We didn't even have carry capacity bags above 100 either which made things extra diffi... <br> 'Carpetiem continues talking for a few hours'",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... and that's how I appeared in Idle Skilling without anyone ever noticing me! Anyway them youngin's still keep idling their lives away so ya best do a better job settin' a good example!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Kids admire the worst people! Ninjas Streams and even the letter Q for some dang reason! Hows about you show em what a real role model is? <br> QUEST:Defeat the former Heavyweight Champ with Red Boxing Gloves equipped.",
                        "NextIndex": 15,
                        "Name": "Be like Buster!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hot diggity what a fight! I've never seen jabs as quick as those! Although back in my day boxing matches weren't just a few punches over a few rounds. They used to last for six hours and fifteen minutes and always had a... <br> 'Carpentiem continues talking for 110 rounds'",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... anyway that's how I ended up all red like this even though Scrippius and I were born identical twins! <br> Well sir guess theres just one more thing I wantya to do and I'll feel like ya helped me 100 times over!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Looky here I'm gettin' pretty old... and I'm startin' to regret spending so much time bitter toward that darn younger generation! Can ya tell help bridge the gap between us? <br> QUEST:Say 'The boomer aint so bad' to 30 different players.",
                        "NextIndex": 19,
                        "Name": "Helping 100 times over"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Thanks a million ya did it! Me and them Zoomer generation are great friends now they even include me in their Ticky Tocky shenanigans it's great fun! <br> Now get off my lawn ya darn millenial!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Djonnut", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Djonnuttown",
                    "world": "Yum-Yum Desert",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 2.62,
                    "starSign": "Capricorn",
                    "mothersMaidenName": "Perez",
                    "notes": "<p>[[Djonnut]] is found in [[Worlds#D12 - Djonnuttown|Djonnuttown]], by the door to the [[Efaunt]] boss fight.</p>$NEWLINE$$NEWLINE$Upon completing his second quest the player is awarded with the ability to talk to him once every day to obtain an {{CraftReq|Efaunt's Tomb Key}}.$NEWLINE$$NEWLINE$<p>He will hold keys for you for up to 3 days. Having more characters complete his second quest provides more daily keys, and one character can collect all of your daily keys at once.</p>$NEWLINE$"
                },
                "quests": {
                    "Genie Dieting": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Get for me all the most very blue items! I will use to regain my wishing powers! <br> QUEST:Collect some very blue thingies for this very blue dude",
                        "NextIndex": 4,
                        "Name": "Genie Dieting",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "Timecandy1", "quantity": 8}],
                        "QuestName": "Djonnut1",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "The recipe for Icing Ironbite comes from [[Tasks]]. Average Mana Potions are dropped by Forest monsters and [[Amarok]]."
                        },
                        "ItemReq": [
                            <ComponentModel>{"item": "FoodPotMana2", "quantity": 200},
                            <ComponentModel>{"item": "FoodMining1", "quantity": 600},
                            <ComponentModel>{"item": "Fish3", "quantity": 150}
                        ]
                    },
                    "I'm Blue Dabadedada": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ok pls why yu hef to be mad is only videogame! I make it up to you just get me mor blue stuffs and I wish for door open for you! <br> QUEST:Defeat Moonmen and retrieve some ghosts",
                        "NextIndex": 7,
                        "Name": "I'm Blue Dabadedada",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "Key2", "quantity": 2}],
                        "QuestName": "Djonnut2",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Kill 10k [[Moonmoon|Moonmoons]] and gather 1 [[Ghost]] drop. Moonmoons killed/Ghosts collected before you start this quest do not count. Complete this quest to earn daily {{CraftReq|Efaunt's Tomb Key}}s."
                        },
                        "CustomType": "Djonnut2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Moonmen Defeated:", "finalV": 10000, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Ghosts Collected:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "The Blue New World": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "How I would love to see this blue world. I would of be so happy but no I must remain here. Please player please help me see the blue world! <br> QUEST:He's blue nuff said.",
                        "NextIndex": 15,
                        "Name": "The Blue New World",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 14,
                        "Rewards": [<ComponentModel>{"item": "Key2", "quantity": 5}, <ComponentModel>{"item": "NPCtoken25", "quantity": 1}],
                        "QuestName": "Djonnut3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "These are all monster drops from World 3."},
                        "ItemReq": [
                            <ComponentModel>{"item": "SnowA2", "quantity": 2500},
                            <ComponentModel>{"item": "SnowB1", "quantity": 2500},
                            <ComponentModel>{"item": "SnowB2", "quantity": 2500}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hallo you want me grant wish to open pyramid? Weeeell you are not of luck today. I wish for big donut and got small donut instead so my powers work are not work.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "But hay! Your mana bar so full maybe you get me mana items so I can make wishes again? Then I wish for pyramid to open why not.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Get for me all the most very blue items! I will use to regain my wishing powers! <br> QUEST:Collect some very blue thingies for this very blue dude",
                        "NextIndex": 4,
                        "Name": "Genie Dieting"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oooo very naiiice! I feel like I hav the wishyness to open up that pyra-- <br> I WISH FOR A BUNCH OF CANDY! <br> ...ehe whooopses! It kinda just slipped out. Here u can hav some of my candy!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ok pls why yu hef to be mad is only videogame! I make it up to you just get me mor blue stuffs and I wish for door open for you! <br> QUEST:Defeat Moonmen and retrieve some ghosts",
                        "NextIndex": 7,
                        "Name": "I'm Blue Dabadedada"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You only hav two measly blue items? This won't work at all it is hopeless!! Boy am I feeling blue... <br> AHA! I WISH FOR BIG DONUT!!! <br> Haha I am of joking! I never lost my power I only wanted to make a funny lololol!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Here are ur keys to the pyramid and if you return tomorrow more keys I will wish for you! And to say sorry for joke earlier I even wait up to 3 days and will give u keys as if you were here every day!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Sayyy have you gotten the elephant boss rare equip? It is very naiiice for the grind!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Here are ur keys to the pyramid and if you return tomorrow more keys I will wish for you! And to say sorry for joke earlier I even wait up to 3 days and will give u keys as if you were here every day!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Friend can you do one more thing for me yes?",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I have heard of this... World Three. It is blue right?",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "How I would love to see this blue world. I would of be so happy but no I must remain here. Please player please help me see the blue world! <br> QUEST:He's blue nuff said.",
                        "NextIndex": 15,
                        "Name": "The Blue New World"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 2 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So blue never niiice! Very... cool! Bwahaha I am apologize I had to I had to.",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Sayyy have you gotten the elephant boss rare equip? It is very naiiice for the grind!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Here are ur keys to the pyramid and if you return tomorrow more keys I will wish for you! And to say sorry for joke earlier I even wait up to 3 days and will give u keys as if you were here every day!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Goldric", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Shifty Sandbox",
                    "world": "Yum-Yum Desert}}n",
                    "noQuest": 5,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 3.11,
                    "starSign": "Libra",
                    "mothersMaidenName": "Anderson",
                    "notes": "[[Goldric]] is found in [[Worlds#D6 - Shifty Sandbox|Shifty Sandbox]]. In order to get any quests from Goldric, you must have gotten far enough in the [[Cowbo Jones]] questline by completing three quests for [[Bandit Bob]]. Until you've completed the requisite quests, Goldric refuses to talk to you.$NEWLINE$"
                },
                "quests": {
                    "Trickle Down Economics": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Money this money that. I'll toss you some coins like you're a laundromat! If you pick them up we'll continue to chat! <br> QUEST:Collect copper coins by running over them.",
                        "NextIndex": 6,
                        "Name": "Trickle Down Economics",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 5,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 3}, <CoinRewardModel>{"item": "", "quantity": 10000}],
                        "QuestName": "Goldric1",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "You need to have the [[Cowbo Jones]] quest 'Commence Criminal Crimes!' active in order to get this quest."
                        },
                        "CustomType": "Goldric1",
                        "CustomArray": [<CustomReqModel>{"desc": "Coins Collected:", "finalV": 15, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Hoopsies": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go on then see if you can beat my hiscore! Eieioaioioeeehehehe!! I never get to play game with people what a hoot! <br> QUEST:Pass through 15 hoops in a row. <br> OR <br> Pass a total of 90 hoops across all attempts",
                        "NextIndex": 10,
                        "Name": "Hoopsies",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 9,
                        "Rewards": [
                            <ComponentModel>{"item": "PremiumGem", "quantity": 4},
                            <ComponentModel>{"item": "StoneT3", "quantity": 2},
                            <ExpRewardModel>{"item": "Experience6", "quantity": 10000}
                        ],
                        "QuestName": "Goldric2",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "'Hoopsies' refers to the [[Catching]] minigame. Completing either objective is enough to clear this quest."
                        },
                        "CustomType": "Goldric2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Hoops In-A-Row:", "finalV": 15, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Total Hoops", "finalV": 90, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Only Winners have Portraits": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Before you crime me up hows about we solidify my image as a nobleman first? It'll make you all the more infamous when you steal from me! <br> QUEST:Find various goldric paintings from Desert Monsters.",
                        "NextIndex": 13,
                        "Name": "Only Winners have Portraits",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 12,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 5}, <CoinRewardModel>{"item": "", "quantity": 10000}],
                        "QuestName": "Goldric3",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "The paintings drop from [[Mimic|Mimics]], [[Mafioso|Mafiosos]] and [[Sand Castle|Sand Castles]]."
                        },
                        "ItemReq": [
                            <ComponentModel>{"item": "GoldricP1", "quantity": 200},
                            <ComponentModel>{"item": "GoldricP2", "quantity": 200},
                            <ComponentModel>{"item": "GoldricP3", "quantity": 200}
                        ]
                    },
                    "Criminal Code of Conduct": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... ah right! The crime and all that... <br> Well? Don't be daft! You can't just commit a crime without first giving me a gift! We live in a society!! <br> QUEST:Find the perfect gift for an animated gold bar monarch. You may have to sift through a lot of crap to find it!",
                        "NextIndex": 16,
                        "Name": "Criminal Code of Conduct",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 15,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 7}, <ComponentModel>{"item": "StoneW6", "quantity": 2}],
                        "QuestName": "Goldric4",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "While you have this quest active and have the [[Alchemy#Level_up_Gift|Level Up Gift Alchemy Bubble]] equipped, [[Pre Crime Box|Pre Crime Boxes]] may drop. They don't do anything, you can safely sell them."
                        },
                        "ItemReq": [<ComponentModel>{"item": "Sewers1b", "quantity": 1}]
                    },
                    "Dress to Impress": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "... pardon me we have more important matters to attend to. It's Crime Time!! <br> Say you're not really going to commit a crime looking like that are you? <br> QUEST: Equip a golden helmet platebody platelegs and any golden tool.",
                        "NextIndex": 19,
                        "Name": "Dress to Impress",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 18,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest27", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 60000},
                            <CoinRewardModel>{"item": "", "quantity": 25000}
                        ],
                        "QuestName": "Goldric5",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Goldric5",
                        "CustomArray": [<CustomReqModel>{"desc": "Wear All Gold", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Dont lay a finger on my Sheepies!!!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You mustn't harm my precious sheepies! They are very VERY expensive! Now then dispose of those sandcastles! <br> QUEST:Defeat all sandcastle monsters without hurting the sheepies.",
                        "NextIndex": 26,
                        "Name": "Dont lay a finger on my Sheepies!!!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 25,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken21", "quantity": 1}, <ComponentModel>{"item": "Timecandy5", "quantity": 1}],
                        "QuestName": "Goldric6",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Goldric6",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Defeat Sandcastles:", "finalV": 18, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Dont Hurt Sheep:", "finalV": 6, "type": "GreaterEqual", "startV": 6}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You weren't expecting 'me' to converse with a commoner such as yourself were you?? Bah what a quaint notion! Run along now and take your poorness with you. Ta-ta!",
                        "NextIndex": 0,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "TEST DIALOGUE YOU SHOULDNT BE ABLE TO SEE THIS",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ohoho good morrow commoner! Coming to beg for my money no doubt! <br> Oh... you are here to attempt to crime me? Oh goodie! Finally some excitement!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You see I have grown quite bored of my vast wealth which is great in both size and volume! <br> Oh pardon me I got that wrong I'm not bored of it at all lets talk of it some more!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Money this money that. I'll toss you some coins like you're a laundromat! If you pick them up we'll continue to chat! <br> QUEST:Collect copper coins by running over them.",
                        "NextIndex": 6,
                        "Name": "Trickle Down Economics"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Good show! We can see to your whole 'criminal intentions' later but I dare say my good man that we are having too much fun! The game must go on!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Have you had a chance to play that hoopsie catchie game? It'd be a shame for you to get arrested for theft before getting to have a go at that!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go on then see if you can beat my hiscore! Eieioaioioeeehehehe!! I never get to play game with people what a hoot! <br> QUEST:Pass through 15 hoops in a row. <br> OR <br> Pass a total of 90 hoops across all attempts",
                        "NextIndex": 10,
                        "Name": "Hoopsies"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My good fellow you sure missed your calling as a Party Patsy! ... erm it's a rich people thing never you mind! Anyway I think we best move on from games lest we forget why you're here!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Before you crime me up hows about we solidify my image as a nobleman first? It'll make you all the more infamous when you steal from me! <br> QUEST:Find various goldric paintings from Desert Monsters.",
                        "NextIndex": 13,
                        "Name": "Only Winners have Portraits"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ohohoho! Don't I look maaaarvelous! Mmmmm such a shiny exterior no wonder I am the envy of all those silver spoon crybabies! Why I could go on and on and on about how wonderful I...",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "... ah right! The crime and all that... <br> Well? Don't be daft! You can't just commit a crime without first giving me a gift! We live in a society!! <br> QUEST:Find the perfect gift for an animated gold bar monarch. You may have to sift through a lot of crap to find it!",
                        "NextIndex": 16,
                        "Name": "Criminal Code of Conduct"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh goodie! It's nearly as beautiful as yours truely! You sure are taking the initiative here really pulling yourself up by the bootstraps! Quite the funny sight too considering that it's impossible. I only say it to give you poor folk the false pretense that your terrible economic situa...",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "... pardon me we have more important matters to attend to. It's Crime Time!! <br> Say you're not really going to commit a crime looking like that are you? <br> QUEST: Equip a golden helmet platebody platelegs and any golden tool.",
                        "NextIndex": 19,
                        "Name": "Dress to Impress"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah you look picture perfect! Righto lets commit that crime of yours! <br> ahem... <br> EGAD! THIEF THIEF! HOW DARE YOU STEAL MY... uh...",
                        "NextIndex": 20,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... HALF EATEN BAG OF PEANUTS!!! MY PRIZED POSESSION! YOU'LL NEVER GET AWAY WITH THIS YOU CRIMINAL MASTERMIND!! <br> 'Goldric hands you the bag of peanuts after quickly taking a few more out to eat later'",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My my wasn't that a thrill! I haven't experienced a good mugging like that since my childhood days of watching my father underpay his laborers myeheheheh!",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Well hows about you come back later? I grow weary of this chitchat there's not much of an ROI on it after all! <br> Return at Class Lv. 61.",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aha! My minstrel has returned and with what timing! I just got some sheepies imported from the Frostbite Tundra express shipping of course!",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You mustn't harm my precious sheepies! They are very VERY expensive! Now then dispose of those sandcastles! <br> QUEST:Defeat all sandcastle monsters without hurting the sheepies.",
                        "NextIndex": 26,
                        "Name": "Dont lay a finger on my Sheepies!!!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Bwahahaha!!! What a hoot! <br> Ok I'm bored. Ta-ta! <br> That means get lost in rich-speak.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Omar Da Ogar", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Unknown",
                    "world": "Unknown",
                    "noQuest": 0,
                    "repeatable": "Unknown",
                    "type": "Unknown",
                    "birthWeight": 7.66,
                    "starSign": "Gemini",
                    "mothersMaidenName": "Duffmann}}n",
                    "notes": ""
                },
                "quests": {},
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Me Omar Da Ogar! Me have sail boat take you over water to other places!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "''Omar looks back over his shoulder and at the anchor he is holding...'' <br> Me have no sail boat... <br> Dev Note: ISLAND EXPEDITIONS ARE COMING IN A FUTURE UPDATE. Enjoy the sunset in the meantime!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Meel", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Secret",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "Secret",
                    "birthWeight": 7.2,
                    "starSign": "Aries",
                    "mothersMaidenName": "Rodriguez",
                    "notes": "[[Meel]] is found in The Crypt, a hidden area past [[Worlds#S3 - The Office|The Office]] in the Sewers. See [[Secrets#The_Crypt|Secrets]] for more details.$NEWLINE$"
                },
                "quests": {
                    "Spooky Scary Skelepoops": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You deserve Gems! And one two three four and one two three four! Go dab on those bone poops! They only come 'round once per day unlike my hips! <br> QUEST:Defeat the Boops!",
                        "NextIndex": 5,
                        "Name": "Spooky Scary Skelepoops",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 25}],
                        "QuestName": "Meel1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Meel1",
                        "CustomArray": [<CustomReqModel>{"desc": "Boops Bopped:", "finalV": 30, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Waitin' for the Cards to Drop": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Remember those Boops take 24 hours to respawn. Pop shove it boo yah!!! While you're grinding for their card why not gather me some bones? <br> QUEST:Collect Bonemeal for Meel! This will take a while...",
                        "NextIndex": 8,
                        "Name": "Waitin' for the Cards to Drop",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "EquipmentRings6", "quantity": 1}, <ComponentModel>{"item": "StoneA3b", "quantity": 6}],
                        "QuestName": "Meel2",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "Sewers3", "quantity": 777}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Doot doot!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh yeaaa!! Oh yeaaa!!! Work it woooo!!!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hey gamer! Ooo yea rattle them ribs!!! You found a secret! Mmm yea to the left to the right! That's friggin Epic!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You deserve Gems! And one two three four and one two three four! Go dab on those bone poops! They only come 'round once per day unlike my hips! <br> QUEST:Defeat the Boops!",
                        "NextIndex": 5,
                        "Name": "Spooky Scary Skelepoops"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're packs full! Work them bones yea! I can't give you your gems!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Niiiice! Shake-a shake-a! Take these gems you disembowler! Aww yea pivot them funnybones!!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Remember those Boops take 24 hours to respawn. Pop shove it boo yah!!! While you're grinding for their card why not gather me some bones? <br> QUEST:Collect Bonemeal for Meel! This will take a while...",
                        "NextIndex": 8,
                        "Name": "Waitin' for the Cards to Drop"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh hey gamer! Ooo yea!!! You found a secret! Mmm yea to the left to the right!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh hey gamer! Ooo yea!!! You found a secret! Mmm yea to the left to the right!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Clown", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "YumYum Grotto",
                    "world": "YumYum Desert",
                    "noQuest": 0,
                    "repeatable": "Unknown",
                    "type": "NPC",
                    "birthWeight": 9.36,
                    "starSign": "Scorpio",
                    "mothersMaidenName": "Fletcher",
                    "notes": "The Clown is located beside [[Desert Davey]] to his right.$NEWLINE$"
                },
                "quests": {},
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Games! Fun! Prizes! Come play why dont ya!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I run the Arcade the greatest game in town! Search around there isn't a more thrilling game to be found! Just gimme a tap and that will be that!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Snake Jar", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "The Mimic Hole",
                    "world": "Yum-Yum Desert",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 4.16,
                    "starSign": "Aries",
                    "mothersMaidenName": "Jones",
                    "notes": "[[Snake Jar]] sits at the bottom of [[Worlds#D2 - The Mimic Hole|The Mimic Hole]], near the portal to [[Bandit Bob]].$NEWLINE$"
                },
                "quests": {
                    "Lookin' Like a Snack": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Ssssssurprise! I wasss lying I am indeed going to give you a quesssst! But I ssstill indend to eat you alive sssso get me some teeth! <br> QUEST: Get some teeth so you can be eaten! Mmm yummy!",
                        "NextIndex": 5,
                        "Name": "Lookin' Like a Snack",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "StoneHelm6", "quantity": 3}, <ComponentModel>{"item": "PremiumGem", "quantity": 6}],
                        "QuestName": "Snake Jar1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "DesertA2", "quantity": 4200}]
                    },
                    "Red Stuff Bad!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Ssssso heres the thing... I can't actually bite you because your blood would violate this game's E-10 rating. Get me sssome red liquid so we can pretend I'm eating you! <br> QUEST: BLOOD FOR THE BLOOD GODS!!! Err... I mean get HP pots!",
                        "NextIndex": 8,
                        "Name": "Red Stuff Bad!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "InvStorage11", "quantity": 1}, <ComponentModel>{"item": "Timecandy4", "quantity": 1}],
                        "QuestName": "Snake Jar2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "FoodPotRe1", "quantity": 8500}]
                    },
                    "PSA. You Are Being Eaten!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Now come over here or no one will believe that it was me who brought you to your end! <br> QUEST: Wait why do they want to pretend to have eaten you again? Uh oh I don't like the look of that Quest Helper...",
                        "NextIndex": 11,
                        "Name": "PSA. You Are Being Eaten!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "EquipmentHats44", "quantity": 1},
                            <ComponentModel>{"item": "ExpBalloon2", "quantity": 3},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 20}
                        ],
                        "QuestName": "Snake Jar3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "At 150 defense the damage is around 900 hp."},
                        "CustomType": "Snake Jar3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Survive being Eaten:", "finalV": 4, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Stand Near Snake Jar:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "A Noob, served Medium Rare!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go get me ssssomeone else to eat and make ssssure they're a total noob ssso I can ssswallow them whole! <br> QUEST:Lure another player to Snakejar's platform and have them say 'Hi'.",
                        "NextIndex": 18,
                        "Name": "A Noob, served Medium Rare!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 17,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken17", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy1", "quantity": 3},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 10}
                        ],
                        "QuestName": "Snake Jar4",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Snake Jar4",
                        "CustomArray": [<CustomReqModel>{"desc": "Other players lured:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "SSSSSSSssss....",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "...ssssssup....",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "...pperrr isss trying to talk to me. Come clossser so that I may eat you alive. I definitely won't give you a quesssst or anything.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Ssssssurprise! I wasss lying I am indeed going to give you a quesssst! But I ssstill indend to eat you alive sssso get me some teeth! <br> QUEST: Get some teeth so you can be eaten! Mmm yummy!",
                        "NextIndex": 5,
                        "Name": "Lookin' Like a Snack"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have no sssspace! Please clear 2 spaces for these itemssss.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ssssuch wonderful teeth but turnssss out I already have teeth with which to eat you! My misssstake sssssss!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Ssssso heres the thing... I can't actually bite you because your blood would violate this game's E-10 rating. Get me sssome red liquid so we can pretend I'm eating you! <br> QUEST: BLOOD FOR THE BLOOD GODS!!! Err... I mean get HP pots!",
                        "NextIndex": 8,
                        "Name": "Red Stuff Bad!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have no sssspace! Please clear 2 spaces for these itemssss.",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Fantassstic! I'll soak the teeth in this liquid ssssso that it will appear to all that I've taken a bite out of you when I pretend to.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Now come over here or no one will believe that it was me who brought you to your end! <br> QUEST: Wait why do they want to pretend to have eaten you again? Uh oh I don't like the look of that Quest Helper...",
                        "NextIndex": 11,
                        "Name": "PSA. You Are Being Eaten!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have no sssspace! Please clear 3 spaces for these itemssss.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hmm I ssssuppose I'll have to asssk the next player I see to prepare themsssselves medium rare... your sssspecies is a bit tough for my tassstes.",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "...", "NextIndex": 13, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... ...",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... ... ...",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... ... ... ... that'sssss enough waiting where are the other playerssss??",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go get me ssssomeone else to eat and make ssssure they're a total noob ssso I can ssswallow them whole! <br> QUEST:Lure another player to Snakejar's platform and have them say 'Hi'.",
                        "NextIndex": 18,
                        "Name": "A Noob, served Medium Rare!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have no sssspace! Please clear 3 spaces for these itemssss.",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "MMMMmmmm what a juicy noob that was! The dumb ones are alwayssss the most ssssucculent!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Loominadi", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Up Up Down Down",
                    "world": "Yum-Yum Desert",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 3.03,
                    "starSign": "Libra",
                    "mothersMaidenName": "Thomas",
                    "notes": "[[Loominadi]] is found in [[Worlds#D10 - Up Up Down Down|Up Up Down Down]].$NEWLINE$"
                },
                "quests": {
                    "Rhyming is Key!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Moonmen steal key they're meant for me! Get them back rare as they may be! <br> QUEST:Kill moonmen until they drop all the keys you need.",
                        "NextIndex": 5,
                        "Name": "Rhyming is Key!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 4,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneZ1", "quantity": 3},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 8},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 5}
                        ],
                        "QuestName": "Loominadi1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest18", "quantity": 10}]
                    },
                    "Uh, Something About Vials?": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But no you have forgot! Those vials are vital are they not? With no other spot in the plot they deserve a shot! <br> QUEST:Upgrade 13 Vials up to light-blue rarity or higher",
                        "NextIndex": 8,
                        "Name": "Uh, Something About Vials?",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneZ1", "quantity": 3},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 10},
                            <ComponentModel>{"item": "PureWater", "quantity": 15}
                        ],
                        "QuestName": "Loominadi2",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": "'Light Blue' means level 5."},
                        "CustomType": "Loominadi2",
                        "CustomArray": [<CustomReqModel>{"desc": "Blue Alch Vials:", "finalV": 13, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Journey to the Center of the Blundermines": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So go go go what do you wait for? There's no more in store up here anymore go explore the world's core! <br> QUEST:Reach the Ol' Straightaway mining area with Plat and Dementia ore.",
                        "NextIndex": 12,
                        "Name": "Journey to the Center of the Blundermines",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneZ2", "quantity": 5},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 15},
                            <ComponentModel>{"item": "Quest37", "quantity": 2}
                        ],
                        "QuestName": "Loominadi3",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Loominadi3",
                        "CustomArray": [<CustomReqModel>{
                            "desc": "Reach Ol' Straightaway:",
                            "finalV": 1,
                            "type": "GreaterEqual",
                            "startV": 0
                        }]
                    },
                    "The Mummy of Mystery": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "It must be found out. My status as the most secret is in doubt... a status I cannot live without! <br> QUEST:Find the biggest secret in all of YumYum Desert and defeat it.",
                        "NextIndex": 17,
                        "Name": "The Mummy of Mystery",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 16,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken24", "quantity": 1},
                            <ComponentModel>{"item": "Weight8", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy5", "quantity": 1}
                        ],
                        "QuestName": "Loominadi4",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": "See [[King Doot]] for details on summoning this secret boss."},
                        "CustomType": "Loominadi4",
                        "CustomArray": [<CustomReqModel>{"desc": "Secret Boss Defeated:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ooowee such a spooky place this be!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Rope go up but where it go? Then rope over there but how? No one know!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I like mystery this place for me! But in need of help this pyramid be!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Moonmen steal key they're meant for me! Get them back rare as they may be! <br> QUEST:Kill moonmen until they drop all the keys you need.",
                        "NextIndex": 5,
                        "Name": "Rhyming is Key!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have full inventory is this end of story?",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I like keys they open doors! Many many doors some below floors!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But no you have forgot! Those vials are vital are they not? With no other spot in the plot they deserve a shot! <br> QUEST:Upgrade 13 Vials up to light-blue rarity or higher",
                        "NextIndex": 8,
                        "Name": "Uh, Something About Vials?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have full inventory is this end of your story?",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "The deed done hope you had fun! But you must run free and leave me be where the sun I cannot see!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My head keeps spinning around and around. It won't stop until you go underground never to be found!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So go go go what do you wait for? There's no more in store up here anymore go explore the world's core! <br> QUEST:Reach the Ol' Straightaway mining area with Plat and Dementia ore.",
                        "NextIndex": 12,
                        "Name": "Journey to the Center of the Blundermines"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have a full inventory is this end of the story?",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Oowee I've got more to say just not today! <br> Return at Lv. 70",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "While you were gone I had a vision so strong... and realized I had it all wrong!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "There is a secret portal with a secret key! Unseen by any mere mortal it eluded even me!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "It must be found out. My status as the most secret is in doubt... a status I cannot live without! <br> QUEST:Find the biggest secret in all of YumYum Desert and defeat it.",
                        "NextIndex": 17,
                        "Name": "The Mummy of Mystery"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You have full inventory is this end of your story?",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Vanquished at last boy that was fast! That iconoclast mummy has passed I forecast that my status will now go unsurpassed! Thank you player this was really great... an absolute blast!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Wellington", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Sands of Time",
                    "world": "",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.69,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Brown",
                    "notes": "[[Wellington]] is found in [[Worlds#D11 - Sands of Time|Sands of Time]].$NEWLINE$$NEWLINE$Like other piggy NPCs, his quests award stamps. For help completing his quests, see [[Secrets]].$NEWLINE$"
                },
                "quests": {
                    "Platforms in Disguise, Platsformers!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Next to the 1st mark I see frogs the 2nd mark I believe is located in a Doctors office and the 3rd is somewhere between the Grandioso Canyon and here. <br> QUEST:Find the 3 invisible platforms hidden throughout the game.",
                        "NextIndex": 5,
                        "Name": "Platforms in Disguise, Platsformers!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "StampB14", "quantity": 1}, <ComponentModel>{"item": "StampA24", "quantity": 1}],
                        "QuestName": "Wellington1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "See [[Secrets]] for more information."},
                        "CustomType": "Wellington1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Platform 1 Found:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Platform 2 Found:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Platform 3 Found:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Findin' Fingerprints": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You see I seek the whereabouts of the Maestro Blobulyte... it's a Journeyman thing. Anywho I am about ready to Job Advance and I am certain Lavaflame2 put in a secret subclass NPC somewhere! <br> QUEST:Collect materials maybe the blobulyte left some fingerprints on one?",
                        "NextIndex": 8,
                        "Name": "Findin' Fingerprints",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <ComponentModel>{"item": "PremiumGem", "quantity": 5},
                            <ComponentModel>{"item": "StampB20", "quantity": 1},
                            <ComponentModel>{"item": "StampB22", "quantity": 1}
                        ],
                        "QuestName": "Wellington2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [
                            <ComponentModel>{"item": "DesertC1", "quantity": 2500},
                            <ComponentModel>{"item": "DesertC2", "quantity": 2500},
                            <ComponentModel>{"item": "DesertC3", "quantity": 2500}
                        ]
                    },
                    "You Can't Run, but you Can Hide": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "A quick search on the Wiki revealed that the Blobulyte is hiding behind the only flowering cactus in the game. Beyond that I'm stumped... <br> QUEST:Give up on your search for the Maestro Blobulyte by saying 'Darn you Blobulyte! Why must you hide like a coward'",
                        "NextIndex": 12,
                        "Name": "You Can't Run, but you Can Hide",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 11,
                        "Rewards": [<ComponentModel>{"item": "StampC14", "quantity": 1}, <ComponentModel>{"item": "ExpBalloon2", "quantity": 2}],
                        "QuestName": "Wellington3",
                        "Difficulty": 1,
                        "note": <NoteModel>{
                            "note": "It has to be typed exactly like Wellington says, cAsE sEnSiTiVe. If you're not using a US Keyboard layout, Shift+1 is how you must type the exclamation point. Requires level 70."
                        },
                        "CustomType": "Wellington3",
                        "CustomArray": [<CustomReqModel>{"desc": "Up's Given:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Puzzles and Math, a Winning Combination!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Right-o! Here's the puzzle: <br> Square the number of letters in your character's name. For example 'Koala2' would be 6x6=  36. Kill sand giants until there are exactly 'that' many items on the ground and talk to me! If you get it wrong I'll remove ALL items in the map! <br> QUEST:Do the puzzle!",
                        "NextIndex": 17,
                        "Name": "Puzzles and Math, a Winning Combination!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 16,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken23", "quantity": 1},
                            <TalentRewardModel>{"item": "TalentBook1", "quantity": 3622100},
                            <ComponentModel>{"item": "ExpBalloon3", "quantity": 3}
                        ],
                        "QuestName": "Wellington4",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "A stack of items counts as one on the ground. Coins also count as items. Spaces in your name do NOT count."
                        },
                        "CustomType": "Wellington4",
                        "CustomArray": [<CustomReqModel>{"desc": "Puzzle Complete:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Greetings my good man.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I am Sir Wellington Snoutsworth... yes THAT Sir Wellington Snoutsworth! Famed explorer world renouned adventurer owner of the infinite paged map!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "As it happens I was just browsing page 6 infinity 7 of my map here... and I noticed some strange markings I could have sworn weren't there before!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Next to the 1st mark I see frogs the 2nd mark I believe is located in a Doctors office and the 3rd is somewhere between the Grandioso Canyon and here. <br> QUEST:Find the 3 invisible platforms hidden throughout the game.",
                        "NextIndex": 5,
                        "Name": "Platforms in Disguise, Platsformers!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please my good man show some respect! My prizes for completing the quest are well worth keeping you are very mistaken to not have 2 open inventory spaces!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My my so these marks were indeed phased in from an alternate universe? Perhaps a higher order world will shed light on their existence but whatever they may be they haven't much to do with me.",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "You see I seek the whereabouts of the Maestro Blobulyte... it's a Journeyman thing. Anywho I am about ready to Job Advance and I am certain Lavaflame2 put in a secret subclass NPC somewhere! <br> QUEST:Collect materials maybe the blobulyte left some fingerprints on one?",
                        "NextIndex": 8,
                        "Name": "Findin' Fingerprints"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please my good man show some respect! My prizes for completing the quest are well worth keeping you are very mistaken to not have 3 open inventory spaces!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Good finds old sport! Now then lets see... <br> Well quite frankly there isn't so much as a trace of Blob on any of these! Wherever that Blobulyte is they haven't been around these three monsters in a long time...",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Well we've got ourselves a game of hide and seek! Why don't you come back later once I've found them? <br> Return at Class Lv.70",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "A quick search on the Wiki revealed that the Blobulyte is hiding behind the only flowering cactus in the game. Beyond that I'm stumped... <br> QUEST:Give up on your search for the Maestro Blobulyte by saying 'Darn you Blobulyte! Why must you hide like a coward'",
                        "NextIndex": 12,
                        "Name": "You Can't Run, but you Can Hide"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please my good man show some respect! My prizes for completing the quest are well worth keeping you are very mistaken to not have 2 open inventory spaces!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hahaha! I concur old sport! However we mustn't get too down. As a matter of fact I take my hat off to the darn thing it's hiding skills are exquisite! I so suppose I'll be staying a lowly Journeyman for now.",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "One day... one day I'll find them! I dare say old sport they can't hide forever! After all sooner or later someone will update the Wiki with a full walkthrough on how to find them!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... but I think we've done our part lets change course here. How about a simple maths puzzle? Get our minds off of that devious blobulyte what do you think?",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Right-o! Here's the puzzle: <br> Square the number of letters in your character's name. For example 'Koala2' would be 6x6=  36. Kill sand giants until there are exactly 'that' many items on the ground and talk to me! If you get it wrong I'll remove ALL items in the map! <br> QUEST:Do the puzzle!",
                        "NextIndex": 17,
                        "Name": "Puzzles and Math, a Winning Combination!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please my good man show some respect! My prizes for completing the quest are well worth keeping you are very mistaken to not have 3 open inventory spaces!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Top stuff my man! Brilliantly solved! I must be getting back to my adventure now as you to yours... cheerio!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Dazey", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Hollowed Trunk",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 12,
                    "starSign": "Aquarius",
                    "mothersMaidenName": "Constantinople",
                    "notes": "[[Dazey]] is found in [[Worlds#T2 - Hollowed Trunk|Hollowed Trunk]], the second zone of the tree, located at the top right of the area.$NEWLINE$$NEWLINE$Her final quest awards the {{CraftReq|Dazey Token}}.$NEWLINE$"
                },
                "quests": {
                    "Dressing like a Dork": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I need some fibres from the forest petals from Baba Yaga aaand... oh right a tiny little stupid pea brain to really tie it all together hahaha! <br> QUEST:Help Dazey build a Sprout costume. You don't actually need a pea brain that was just her being a jerk.",
                        "NextIndex": 5,
                        "Name": "Dressing like a Dork",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 1}],
                        "QuestName": "Dazey1",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "ForestTree", "quantity": 1000}, <ComponentModel>{"item": "Quest41", "quantity": 5}]
                    },
                    "Literally Physics": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "So if you put the other materials on top of the two balls and drop everything the materials will bounce up to me!!! <br> QUEST:Get some woodular circles from branches and do something with them? I don't go to Dazey's school either I'm as confused as you are.",
                        "NextIndex": 11,
                        "Name": "Literally Physics",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 10,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken14", "quantity": 1}, <ComponentModel>{"item": "ExpBalloon2", "quantity": 5}],
                        "QuestName": "Dazey2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "After completing this quest, Dazey will be replaced by [[Sprout]]."},
                        "ItemReq": [
                            <ComponentModel>{"item": "ForestTree", "quantity": 1000},
                            <ComponentModel>{"item": "Quest41", "quantity": 5},
                            <ComponentModel>{"item": "TreeInterior1b", "quantity": 1}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well look who decided to show up... no like really. Who are you? I've never seen you before.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "And why do people like you always keep bugging me on my days off? If I wanted company I wouldn't be all the way up here would I! But no whenever I want some time to myself another one of you humans shows up looking for something to do!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You know what? Here's something to do... go make me a costume so that I look like that little twerp Sprout that way when people DO make it here I'll pretend to be them and since they've done their quests already they won't bother me!!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I need some fibres from the forest petals from Baba Yaga aaand... oh right a tiny little stupid pea brain to really tie it all together hahaha! <br> QUEST:Help Dazey build a Sprout costume. You don't actually need a pea brain that was just her being a jerk.",
                        "NextIndex": 5,
                        "Name": "Dressing like a Dork"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up 2 inventory spaces... like cmon seriously how do you keep forgetting this? I'm like the 12th NPC youve run into probably I swear you gamers never lear... <br> 'Dazey continues to blow your tiny mistake out of proportion for a while longer'",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Haha no way you seriously just did all that even though your codex showed I'd only give you 1 gem??? What a joke... anyway hand me the stuff.",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... well? Why are you just standing there?",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait you CAN'T manually jump?? WHAT??? But you have LEGS! I mean it makes sense that I can't but like I LITERALLY just saw you jumping on those other platforms... jeez this world sucks.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ok new plan. Get two balls... no not THOSE balls you doorknob like actual circular balls. I remember this from class the other week. <br> If you hold one ball right above the other and drop them both the top ball bounces BIG TIME!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "So if you put the other materials on top of the two balls and drop everything the materials will bounce up to me!!! <br> QUEST:Get some woodular circles from branches and do something with them? I don't go to Dazey's school either I'm as confused as you are.",
                        "NextIndex": 11,
                        "Name": "Literally Physics"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Clear up 2 inventory spaces... like cmon seriously how do you keep forgetting this? I'm like the 12th NPC youve run into probably I swear you gamers never lear... <br> 'Dazey continues to blow your tiny mistake out of proportion for a while longer'",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "NICE! FINALLY!!! Now I can make my costume and pretend to be Sprout! No one will ever bother me again!! Just gotta take this off and... <br> Hey can I get some privacy you creep? Please leave the map and come back...",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Cowbo Jones", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "YumYum Grotto",
                    "world": "Yum-Yum Desert",
                    "noQuest": 13,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 7.79,
                    "starSign": "Libra",
                    "mothersMaidenName": "Lee",
                    "notes": "[[Cowbo Jones]] is on the righthand side of [[Worlds#D0 - YumYum Grotto|YumYum Grotto]], near the portal to [[Worlds#D2 - Jar Bridge|Jar Bridge]]. He facilitates the main questline in Yum-Yum Desert much the same way [[Scripticus]] does in Blunder Hills.$NEWLINE$$NEWLINE$His quests introduce [[Alchemy]] and guide the player through the Desert, leading up to [[Efaunt]]. His final quest awards the [[YumYum Sheriff]] Trophy.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "The Grind Begins...?": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "That is unless yer willin' to prove yerself. Go on show me whatcha can do! <br> QUEST:Kill 99999 Sandy Pots",
                        "NextIndex": 3,
                        "Name": "The Grind Begins...?",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 5}, <ExpRewardModel>{"item": "Experience0", "quantity": 9000}],
                        "QuestName": "Cowbo Jones1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": "After 10 active kills, the quest auto-completes."},
                        "CustomType": "Cowbo Jones1",
                        "CustomArray": [<CustomReqModel>{"desc": "Kill Pots:", "finalV": 99999, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Hatless Howerhouse!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Anyways hows about we getcha a real challenge somethin' yall grasslickers over in them thar Blunderhills aint never done before... <br> QUEST:Kill 20 Sandy Pots without your precious hat equipped.",
                        "NextIndex": 6,
                        "Name": "The Hatless Howerhouse!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 5,
                        "Rewards": [
                            <ComponentModel>{"item": "InvStorage4", "quantity": 1},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 15000},
                            <CoinRewardModel>{"item": "", "quantity": 3500}
                        ],
                        "QuestName": "Cowbo Jones2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Cowbo Jones2",
                        "CustomArray": [<CustomReqModel>{"desc": "No-Hat Kill:", "finalV": 20, "type": "GreaterEqual", "startV": 0}]
                    },
                    "No Country for One Character": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Uh... er.. well tell ya what it's actually TOO big fer the two of us. Go get some more of them characters would ya? <br> QUEST:Create at least 3 new players for your Account.",
                        "NextIndex": 9,
                        "Name": "No Country for One Character",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 8,
                        "Rewards": [<ComponentModel>{"item": "Timecandy1", "quantity": 3}, <ExpRewardModel>{"item": "Experience0", "quantity": 17500}],
                        "QuestName": "Cowbo Jones3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Cowbo Jones3",
                        "CustomArray": [<CustomReqModel>{"desc": "Characters Created:", "finalV": 4, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Say Goodbye to your Dubloon!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "...whatever so ya can't talk but don't yall worry yerself cause I sure know one thing that talks round 'ere:cold hard cash! Bring me round sum' that and we can git into some real business. <br> QUEST:Buy a Gold Dubloon to prove your worth.",
                        "NextIndex": 14,
                        "Name": "Say Goodbye to your Dubloon!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 5},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 5},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 3500}
                        ],
                        "QuestName": "Cowbo Jones4",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest19", "quantity": 1}]
                    },
                    "Alchemial Apprentice": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "... you get all that pardner? Ya better 'ave cause I'm boutta test ya! Go unlock a bubble and buy some pure water from the Liquid Shop!",
                        "NextIndex": 21,
                        "Name": "Alchemial Apprentice",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 20,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneW2", "quantity": 2},
                            <ComponentModel>{"item": "StoneA2", "quantity": 3},
                            <ExpRewardModel>{"item": "Experience5", "quantity": 40}
                        ],
                        "QuestName": "Cowbo Jones5",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Bubbles unlocked before you start this quest count, but the [[Distilled Water]] must be purchased while the quest is active."
                        },
                        "CustomType": "Cowbo Jones5",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Bubble Unlocked:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Distilled Water:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Three Vials? Those are Rookie Numbers!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You can unlock vials by dropping specific resources at the cauldron in person. Not all resources have their own vial so ya gotta try 'em all! <br> QUEST:Unlock 2 Vials. Stand infront of the Cauldron then drag an item like Copper out of your inventory",
                        "NextIndex": 23,
                        "Name": "Three Vials? Those are Rookie Numbers!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 23,
                        "Rewards": [<ExpRewardModel>{"item": "Experience0", "quantity": 10000}],
                        "QuestName": "Cowbo Jones6",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "Vials unlocked before you start the quest count. See [[Alchemy#Vials|Alchemy Vials]] for a full list of unlockable Vials."
                        },
                        "CustomType": "Cowbo Jones6",
                        "CustomArray": [<CustomReqModel>{"desc": "Vials Unlocked:", "finalV": 2, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Notorious B.O.B": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Me bein' an immobile cactus I'm still stuck tryna catch the first criminal. He goes by Notorious B.O.B but ya best believe that aint his real name. He should be 'round here somewhere... <br> QUEST:Find the criminal!",
                        "NextIndex": 26,
                        "Name": "The Notorious B.O.B",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 25,
                        "Rewards": [
                            <ComponentModel>{"item": "PremiumGem", "quantity": 3},
                            <ComponentModel>{"item": "ExpBalloon1", "quantity": 2},
                            <ExpRewardModel>{"item": "Experience0", "quantity": 10000}
                        ],
                        "QuestName": "Cowbo Jones7",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "The criminal is located through the portal below Mimics."},
                        "CustomType": "Cowbo Jones7",
                        "CustomArray": [<CustomReqModel>{"desc": "Criminal Found:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Bake Him Away, Toys": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Now then just get him to sign this Arrest Warrant and we'll have his bounty as easy as ya can say 'Easy' which is gosh darn easy I tell ya hwat!",
                        "NextIndex": 29,
                        "Name": "Bake Him Away, Toys",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 28,
                        "Rewards": [<ComponentModel>{"item": "InvBag5", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 15000}],
                        "QuestName": "Cowbo Jones8",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": "You have to complete [[Bandit Bob|Bandit Bob's]] questline for this."},
                        "ItemReq": [<ComponentModel>{"item": "Quest20", "quantity": 1}]
                    },
                    "A Hat in Crime": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Before we start our crime spree we gotta look the part. Go get some materials from the Anvil so I can make ya a hat like mine. <br> QUEST:Yes Bandit Bob set you up and yes Cacto Jones does seem possessed by an evil power!",
                        "NextIndex": 35,
                        "Name": "A Hat in Crime",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 34,
                        "Rewards": [<ComponentModel>{"item": "EquipmentHats30", "quantity": 1}, <ComponentModel>{"item": "StoneHelm6", "quantity": 1}],
                        "QuestName": "Cowbo Jones9",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "CraftMat9", "quantity": 100}, <ComponentModel>{"item": "CraftMat5", "quantity": 750}]
                    },
                    "Commence Criminal Crimes!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Let's start by finding some'n in the Desert to crime on! And not that big bag guy he looks kinda tough... we'll get 'im another day. <br> QUEST:Commit a crime on whoever the quest helper says to lol",
                        "NextIndex": 40,
                        "Name": "Commence Criminal Crimes!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 39,
                        "Rewards": [<ComponentModel>{"item": "InvBag6", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 25000}],
                        "QuestName": "Cowbo Jones10",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": "You have to complete [[Goldric|Goldric's]] questline for this."},
                        "CustomType": "Cowbo Jones10",
                        "CustomArray": [<CustomReqModel>{"desc": "Steal from Goldric:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Worst Trade Deal in History": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "While you progress to Efaunt's tomb at the end of the Desert let's do some good deeds to ward off his evil... how about helping the Shop owner with his money woes? <br> QUEST:Buy and sell a total of 10 Golden Dubloons.",
                        "NextIndex": 46,
                        "Name": "The Worst Trade Deal in History",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 45,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 4}, <ComponentModel>{"item": "ExpBalloon1", "quantity": 3}],
                        "QuestName": "Cowbo Jones11",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Cowbo Jones11",
                        "CustomArray": [<CustomReqModel>{"desc": "Resold Dubloons:", "finalV": 10, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Children? What'd they ever do for Me...": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I feel like we best move on and get to some who Efaunt hasn't corrupted with evil yet. The orphans! Maybe we can help them! <br> QUEST:Donate to the Starving Orphan Monsters foundation in the Cauldron.",
                        "NextIndex": 49,
                        "Name": "Children? What'd they ever do for Me...",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 48,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 6}, <ComponentModel>{"item": "ExpBalloon2", "quantity": 1}],
                        "QuestName": "Cowbo Jones12",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "Donate in the [[Alchemy]] Liquids Tab."},
                        "CustomType": "Cowbo Jones12",
                        "CustomArray": [<CustomReqModel>{"desc": "Donations Made:", "finalV": 4, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Oh No, not the Elderly!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well shucks Efaunt done corrupted the orphans too! There's only one person left to help. <br> We gotta help the elderly... <br> QUEST:Find some old coot to assist. Some old rag a real carpet of a fella you know what I mean.",
                        "NextIndex": 52,
                        "Name": "Oh No, not the Elderly!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 51,
                        "Rewards": [<ComponentModel>{"item": "InvBag8", "quantity": 1}],
                        "QuestName": "Cowbo Jones13",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": "[[Carpetiem]] (in the [[Mashed Potato]] area) is the geezer you must help."},
                        "CustomType": "Cowbo Jones13",
                        "CustomArray": [<CustomReqModel>{"desc": "Geezers Helped:", "finalV": 100, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Tomb Raid": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go now gamer go defeat that darned Efaunt. His tomb is at the very end of the Twilight desert past the Tysons and Sand Giants. His evil reign ends now... <br> QUEST:Raid Efaunt's tomb defeat him and steal his crystal.",
                        "NextIndex": 56,
                        "Name": "Tomb Raid",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 55,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy5", "quantity": 1},
                            <ComponentModel>{"item": "ObolSilverEXP", "quantity": 1},
                            <ComponentModel>{"item": "NPCtoken19", "quantity": 1}
                        ],
                        "QuestName": "Cowbo Jones14",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Cowbo Jones14",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Efaunt Defeated:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Crystal Stolen:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "The New Sheriff": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go make the 3 Yumyum Desert Tokens of Completion and you can have my Yumyum Sherrif Trophy! Here's the token recipes.",
                        "NextIndex": 61,
                        "Name": "The New Sheriff",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 60,
                        "Rewards": [<ComponentModel>{"item": "Trophy11", "quantity": 1}],
                        "QuestName": "Cowbo Jones15",
                        "Difficulty": 9,
                        "note": <NoteModel>{"note": "All the required recipes are given at the start of this quest."},
                        "ItemReq": [
                            <ComponentModel>{"item": "BadgeD1", "quantity": 1},
                            <ComponentModel>{"item": "BadgeD2", "quantity": 1},
                            <ComponentModel>{"item": "BadgeD3", "quantity": 1}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yall best be turnin' yourself right round I tell you hwat. Folks in these parts don't take kindly to outsiders like yorself.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "That is unless yer willin' to prove yerself. Go on show me whatcha can do! <br> QUEST:Kill 99999 Sandy Pots",
                        "NextIndex": 3,
                        "Name": "The Grind Begins...?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Woah there pardner you say the game deverloper Lava completed the quest for ya? Thats mighty strange Lava ain't never done that before. I wonder if... naw it can't be...",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Anyways hows about we getcha a real challenge somethin' yall grasslickers over in them thar Blunderhills aint never done before... <br> QUEST:Kill 20 Sandy Pots without your precious hat equipped.",
                        "NextIndex": 6,
                        "Name": "The Hatless Howerhouse!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 1 more open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well alrighty! Mighty fine fightin' there pardner suppose you outsiders aint so bad! But you still best get on out this town aint big 'nuff fer the two of us!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Uh... er.. well tell ya what it's actually TOO big fer the two of us. Go get some more of them characters would ya? <br> QUEST:Create at least 3 new players for your Account.",
                        "NextIndex": 9,
                        "Name": "No Country for One Character"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That's more like it startin' to really look like one of them epic gamers ya hear about in the saloon! You sure can walk the walk but can ya talk the talk...?",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "...? <br> Well comeon now then I asked ya a question! Can ya talk the talk?",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... he ain't talkin' almost like he done been cursed by an evil power I wonder if... naw Djonnut said that evil Elephant's tomb has been dormant for over a century... it can't be.",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "...whatever so ya can't talk but don't yall worry yerself cause I sure know one thing that talks round 'ere:cold hard cash! Bring me round sum' that and we can git into some real business. <br> QUEST:Buy a Gold Dubloon to prove your worth.",
                        "NextIndex": 14,
                        "Name": "Say Goodbye to your Dubloon!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 2 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Sure is pretty tell ya hwat! Lemme just... hold onto it for ya make sure it's real 'n all that.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Moving on then them monsters gonna whoop yo behind if ya don't use that there Alchemy Cauldron mabobber.",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Listen up and I'll tell ya how it works: <br> You assign characters to different cauldrons to power them. There are Bubble Cauldrons on the 1st page and Liquid Cauldrons on the 2nd page.",
                        "NextIndex": 17,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "BUBBLE CAULDRONS slowly unlock new bonus bubbles. The small ones are passive and will give their bonus to all your characters all the time. The bigger ones must be equipped.",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "LIQUID CAULDRONS give you different waters to spend on shop items. You can only hold so many liquids so make sure to use them when you can.",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "... you get all that pardner? Ya better 'ave cause I'm boutta test ya! Go unlock a bubble and buy some pure water from the Liquid Shop!",
                        "NextIndex": 21,
                        "Name": "Alchemial Apprentice"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 2 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yall got yerself some smarts up in that head of yours yell you hwat! That was some techincal stuff ya just figured out! <br> Let's cover one last thing before we start bustin' crime.",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You can unlock vials by dropping specific resources at the cauldron in person. Not all resources have their own vial so ya gotta try 'em all! <br> QUEST:Unlock 2 Vials. Stand infront of the Cauldron then drag an item like Copper out of your inventory",
                        "NextIndex": 23,
                        "Name": "Three Vials? Those are Rookie Numbers!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Kiss that tutorial goodbye yeeeeHAW! <br> Lets get to some real cowboy bid'ness! There's a list of Wanted Criminals wanderin' all about Yum Yum Desert and each of 'ems got a big ol' EXP bounty on their head.",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Me bein' an immobile cactus I'm still stuck tryna catch the first criminal. He goes by Notorious B.O.B but ya best believe that aint his real name. He should be 'round here somewhere... <br> QUEST:Find the criminal!",
                        "NextIndex": 26,
                        "Name": "The Notorious B.O.B"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 2 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You found the bugger? That's some right good sleuthing you're a natural!",
                        "NextIndex": 27,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Now then just get him to sign this Arrest Warrant and we'll have his bounty as easy as ya can say 'Easy' which is gosh darn easy I tell ya hwat!",
                        "NextIndex": 29,
                        "Name": "Bake Him Away, Toys"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 27,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well tip me sideways and call me the leanin' cactus of Pisa ya got him! Now then lets just take a look at this here signature...",
                        "NextIndex": 30,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yep signature sure looks real... <br> 'As Cowbo is talking you hear an eerie elephant roar and suddenly Cowbo Jones' expression turns sour' <br> REALLY LIKE YOURS! YOU'RE THE CRIMINAL!!",
                        "NextIndex": 31,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yessir this signature right here is EXACTLY the same one I saw you sign all those Post Office orders with so there ain't no doubt that you're the real Bandit Bob!",
                        "NextIndex": 32,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "This is a mighty fine turn of events aint it just! <br> Tell you hwat forget catching criminals... I'm gonna BECOME the criminal! And YOUR gonna help me unless yer fixin' to get turned in!",
                        "NextIndex": 33,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Before we start our crime spree we gotta look the part. Go get some materials from the Anvil so I can make ya a hat like mine. <br> QUEST:Yes Bandit Bob set you up and yes Cacto Jones does seem possessed by an evil power!",
                        "NextIndex": 35,
                        "Name": "A Hat in Crime"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 2 open inventory spaces for rewards! Clear some space and talk to me again!",
                        "NextIndex": 33,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "With this hat we are now the... <br> 'Cacto Jones eyes light up for a moment and his sour expression suddenly switches back to his normal lively look'... <br> the LOVERS OF AMORIA!",
                        "NextIndex": 36,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Haha! The classic subversion of expectations I love me some lighthearted fun! <br> 'You hear the elephant roar once again and immediately Cacto Jones expression sours' <br> Fun? No time for fun we are THE HATS OF CRIME!",
                        "NextIndex": 37,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "In a few quests we gon' be known throughout Idleon as the greatest criminals to ever walk the earth! ...and stay still on the earth since I cant move!",
                        "NextIndex": 38,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Let's start by finding some'n in the Desert to crime on! And not that big bag guy he looks kinda tough... we'll get 'im another day. <br> QUEST:Commit a crime on whoever the quest helper says to lol",
                        "NextIndex": 40,
                        "Name": "Commence Criminal Crimes!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 38,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Howdy pardner how'd it go down? You get sum cold hard cash? Maybe some jewels?",
                        "NextIndex": 41,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You stole... hwat? YOU STOLE HWAT?? <br> 'The sour expression has faded once again as the sheer injustice you've committed seems to have shocked him back to his normal self' <br> Why on earth would you steal THIS!?!!",
                        "NextIndex": 42,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yall was just following... following my orders? Hwat do ya mean I told you to do crimes I'm the sheriff I'm the good guy! It would take an evil power the likes of which haven't been seen in 100 years to turn me evil...",
                        "NextIndex": 43,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... oh lawd 100 years that can only mean one thing. <br> Efaunt the Elephant Pharoah has woken from his slumber. He must be defeated before he corrupts others!",
                        "NextIndex": 44,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "While you progress to Efaunt's tomb at the end of the Desert let's do some good deeds to ward off his evil... how about helping the Shop owner with his money woes? <br> QUEST:Buy and sell a total of 10 Golden Dubloons.",
                        "NextIndex": 46,
                        "Name": "The Worst Trade Deal in History"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 44,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well I'd say that worked! 'cept as soon as ya turned around to come talk to me the shopkeep started pointin' and laughin' at ya... I guess Efaunt already corrupted him.",
                        "NextIndex": 47,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I feel like we best move on and get to some who Efaunt hasn't corrupted with evil yet. The orphans! Maybe we can help them! <br> QUEST:Donate to the Starving Orphan Monsters foundation in the Cauldron.",
                        "NextIndex": 49,
                        "Name": "Children? What'd they ever do for Me..."
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 47,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That was a bit better tell you hwat... hey look we got a letter from the orphanage! It says <br> 'Thank you for the meager donations. You really think you're helping by giving us a little water? Go tuck yourself into bed that is.'",
                        "NextIndex": 50,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well shucks Efaunt done corrupted the orphans too! There's only one person left to help. <br> We gotta help the elderly... <br> QUEST:Find some old coot to assist. Some old rag a real carpet of a fella you know what I mean.",
                        "NextIndex": 52,
                        "Name": "Oh No, not the Elderly!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 50,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That'll just about do it! <br> Wait... did you say the old geezer's name was... Carpetiem?? <br> No no no no!! He was the sweetest darn geezer ya ever saw Efaunt CROSSED THE LINE turning him cranky and evil!",
                        "NextIndex": 53,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "THATS IT. We must RID this land of Efaunt once and for all tell you hwat!",
                        "NextIndex": 54,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go now gamer go defeat that darned Efaunt. His tomb is at the very end of the Twilight desert past the Tysons and Sand Giants. His evil reign ends now... <br> QUEST:Raid Efaunt's tomb defeat him and steal his crystal.",
                        "NextIndex": 56,
                        "Name": "Tomb Raid"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 54,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You got the crystal? <br> ... <br> ... <br> STICK EM UP!",
                        "NextIndex": 57,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "FINALLY I CAN GET TO WORLD 3 AND DITCH THIS DANG DESERT! <br> Just gotta walk myself over to ya and pickpocket the crystal. <br> Oh... right. I got no legs.",
                        "NextIndex": 58,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well guess it just ain't meant to be. I hate this darn place I wish I wasnt the Sherrif... <br> Hang on a tick!",
                        "NextIndex": 59,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go make the 3 Yumyum Desert Tokens of Completion and you can have my Yumyum Sherrif Trophy! Here's the token recipes.",
                        "NextIndex": 61,
                        "Name": "The New Sheriff"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more 1 open inventory space for rewards! Clear some space and talk to me again!",
                        "NextIndex": 59,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Go git 'er dun new Sheriff! YeeeeHAW!!!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Typhoon", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Froggy Fields",
                    "world": "",
                    "noQuest": 1,
                    "repeatable": "Daily",
                    "type": "",
                    "birthWeight": 5.01,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Williams",
                    "notes": "[[Typhoon]] is found in [[Worlds#G3 - Froggy Fields|Froggy Fields]], the second zone of Grasslands, located in the top right of the area next to the [[Colosseum/Dewdrop|Dewdrop Colosseum]].$NEWLINE$$NEWLINE$Completing his quest gives the player the ability to talk to him once every day to obtain a {{CraftReq|Colosseum Ticket}}. He will hold tickets for you for up to 3 days. Having more characters complete his quest does not provide more daily tickets.$NEWLINE$"
                },
                "quests": {
                    "Surprise Attack!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "BAM! Element of surprise! Any fighter worthy of the colosseum has to be ready for monsters appearing out of nowhere! Defeat these frogs and I'll let you in! <br> QUEST:Kill froggies. Forfeit the quest by clicking the Codex if you fail!",
                        "NextIndex": 4,
                        "Name": "Surprise Attack!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "TixCol", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 100}],
                        "QuestName": "Typhoon1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Typhoon1",
                        "CustomArray": [<CustomReqModel>{"desc": "Frogs Defeated:", "finalV": 7, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hello citizen the colosseum peanut gallery is on the third floor in the upper left corner. Viewer admission is free as per Executive Order 66.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait you want to be a combatant? YOU..? COMBATANT?? BE? TO??? <br> Yea I'm going to do you a favor and NOT register you as a combatant.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "BAM! Element of surprise! Any fighter worthy of the colosseum has to be ready for monsters appearing out of nowhere! Defeat these frogs and I'll let you in! <br> QUEST:Kill froggies. Forfeit the quest by clicking the Codex if you fail!",
                        "NextIndex": 4,
                        "Name": "Surprise Attack!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Free up an inventory space. The ticket might be small but it still takes up space.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yea alright so you beat up some frogs that's nothing compared to some of the waves you'll face in there! <br> Well except for the frog wave that's about the same.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Come tap on me every day to get another ticket given you're a registered combatant now. <br> And don't think I won't recognize you on your other characters! You only get 1 ticket every day!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Centurion", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "The Mimic Hole",
                    "world": "Yum-Yum Desert",
                    "noQuest": 5,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 3.06,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Garcia",
                    "notes": "[[Centurion]] is located in [[Worlds#D2 - The Mimic Hole|The Mimic Hole]], next to the [[Colosseum/Sandstone|Sandstone Colosseum]].$NEWLINE$$NEWLINE$Completing his first quest (Down The Mimic Hole!) gives the player the ability to talk to him once every day to obtain a {{CraftReq|Colosseum Ticket}}. This is the second daily source of tickets after [[Typhoon]]. He will hold tickets for you for up to 3 days. Having more characters complete his quests does not provide more daily tickets.$NEWLINE$"
                },
                "quests": {
                    "Down The Mimic Hole!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I haven't got all day get a move on! If I don't see you before vesperna begins don't bother coming back! <br> QUEST:Defeat all mimics before the time runs out.",
                        "NextIndex": 4,
                        "Name": "Down The Mimic Hole!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "TixCol", "quantity": 1}, <ExpRewardModel>{"item": "Experience0", "quantity": 100}],
                        "QuestName": "Centurion1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Centurion1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Mimics Defeated:", "finalV": 21, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Remaining:", "finalV": 1, "type": "GreaterEqual", "startV": 69}
                        ]
                    },
                    "Which one of yous is the Mafia?": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I hadn't anticipated for you to be more than a Tiro but if you can complete the task I gave to my missing soldier I'll transfer his rank to you. <br> QUEST: Defeat Mafiosos and bring proof.",
                        "NextIndex": 9,
                        "Name": "Which one of yous is the Mafia?",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy1", "quantity": 2},
                            <ComponentModel>{"item": "TixCol", "quantity": 2},
                            <CoinRewardModel>{"item": "", "quantity": 10000}
                        ],
                        "QuestName": "Centurion2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "DesertB1", "quantity": 2500}]
                    },
                    "High Scorer": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Before you join the ranks of my Decurios I need to see you fight with valor in my colosseum. QUEST: Get a 200K+ colosseum score. Remember to skip rounds to grow your score multiplier!",
                        "NextIndex": 13,
                        "Name": "High Scorer",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 12,
                        "Rewards": [<ComponentModel>{"item": "Timecandy2", "quantity": 2}, <CoinRewardModel>{"item": "", "quantity": 20000}],
                        "QuestName": "Centurion3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Centurion3",
                        "CustomArray": [<CustomReqModel>{"desc": "Colosseum Score:", "finalV": 200000, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Colosseum Champ!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Alright Dodecahedron... er Decurio if you can slay my colosseum boss and bring in a colosseum hiscore I'll let you become my new Tesserarius. QUEST:Complete all 15 waves with a final score of 350K+",
                        "NextIndex": 17,
                        "Name": "Colosseum Champ!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 16,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy3", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy2", "quantity": 2},
                            <CoinRewardModel>{"item": "", "quantity": 50000}
                        ],
                        "QuestName": "Centurion4",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Centurion4",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Waves Completed:", "finalV": 15, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Colosseum Score:", "finalV": 350000, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Colosseum GDQ": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The rank of Optio is not one I give out flippantly you'll need a full set of talents and strategic wits to pass this test. <br> QUEST:Complete the three colosseums with lots of Time Remaining after beating all waves.",
                        "NextIndex": 21,
                        "Name": "Colosseum GDQ",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 20,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy4", "quantity": 1},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 30},
                            <CoinRewardModel>{"item": "", "quantity": 100000}
                        ],
                        "QuestName": "Centurion5",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": "The numbers are how many seconds you must have remaining for each colosseum."},
                        "CustomType": "Centurion5",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "1st Colosseum:", "finalV": 180, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "2nd Colosseum:", "finalV": 170, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "3rd Colosseum:", "finalV": 160, "type": "GreaterEqual", "startV": 0}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Stop right there civilian scum! You've violated penal code 83.7e under which King Doot demands all travelers enlist for colosseum combat!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "But King Doot hasn't shown up in quite some time and I don't enlist just anyone into my regiment! If you can overcome the dangers down in that hole I will give you a spot as lowly Tiro.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I haven't got all day get a move on! If I don't see you before vesperna begins don't bother coming back! <br> QUEST:Defeat all mimics before the time runs out.",
                        "NextIndex": 4,
                        "Name": "Down The Mimic Hole!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Free up an inventory space. The ticket might be small but it still takes up space.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well well well look who decided to show up... <br> 'Sigh'. Stop looking around I was talking about you!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "As a Tiro you are entitled to daily colosseum tickets so long as you report to me for duties. <br> And don't go trying any trickery on me with multiple characters! You're only getting 1 ticket per day!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Greetings Tiro I'm sure youve heard that one of my soldiers has not returned from his mission to spawncamp the Mafiosos. If you're ready to join as a proper solider now is the time. <br> Return at Class Lv. 45",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I hadn't anticipated for you to be more than a Tiro but if you can complete the task I gave to my missing soldier I'll transfer his rank to you. <br> QUEST: Defeat Mafiosos and bring proof.",
                        "NextIndex": 9,
                        "Name": "Which one of yous is the Mafia?"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear some space all promotions come with rewards!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That is sure to strike fear into those mafs! And to think they had some of my troops fooled into believing they were just ordinary civilians!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "You're proving to be one of my better soldiers! If you train some more youd make for a fine Decurio! <br> Return at Class Lv. 55",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Before you join the ranks of my Decurios I need to see you fight with valor in my colosseum. QUEST: Get a 200K+ colosseum score. Remember to skip rounds to grow your score multiplier!",
                        "NextIndex": 13,
                        "Name": "High Scorer"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear some space all promotions come with rewards!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well done Decurio you have come a long way since I first called you civilian scum!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Lucky for you a Tesserarius of mine was defeated in their colosseum bout last Dootsday. If you get a bit stronger I'll give you a chance at being their successor. Return at Class Lv. 65",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Alright Dodecahedron... er Decurio if you can slay my colosseum boss and bring in a colosseum hiscore I'll let you become my new Tesserarius. QUEST:Complete all 15 waves with a final score of 350K+",
                        "NextIndex": 17,
                        "Name": "Colosseum Champ!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear some space all promotions come with rewards!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Get anything good from that Biggie kill? I remember when I defeated my first one I got a 72 hour candy couldn't believe it ahaha!",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Anyway enough chat get back to training and I'll set you up with a chance to become my newest... hang on let me look up the next rank... Optio! <br> Return at Class Lv. 75",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The rank of Optio is not one I give out flippantly you'll need a full set of talents and strategic wits to pass this test. <br> QUEST:Complete the three colosseums with lots of Time Remaining after beating all waves.",
                        "NextIndex": 21,
                        "Name": "Colosseum GDQ"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please clear some space all promotions come with rewards!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Huh...",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "You know maybe you're the one to finally do it... <br> Return at Class Lv. 130",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So you think you can do it? Well you'll have to come back in a future update to find out.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("XxX Cattleprod XxX", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "The Grandioso Canyon",
                    "world": "",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": -1,
                    "starSign": "",
                    "mothersMaidenName": "",
                    "notes": "[[XxX Cattleprod XxX]] is found in [[Worlds#D5 - The Grandioso Canyon|The Grandioso Canyon]].$NEWLINE$$NEWLINE$Like other piggy NPCs, his quests award stamps. His final quest requires you to interact with other players.$NEWLINE$"
                },
                "quests": {
                    "Peak Gaming": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Smh... look I'll PROVE it to you!! Go kill all the other mobs and I bet one will spawn right here! But you gotta do it quick or they'll just keep respawning up there! <br> QUEST:Kill all the Mafioso's before they respawn.",
                        "NextIndex": 5,
                        "Name": "Peak Gaming",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "StampB4", "quantity": 1}, <ComponentModel>{"item": "StampB19", "quantity": 1}],
                        "QuestName": "XxX Cattleprod XxX1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "XxX Cattleprod XxX1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Mafiosos Defeated:", "finalV": 15, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 30}
                        ]
                    },
                    "Wait No, I meant Pathetic Gaming": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Wait no I remember!! You need to also kill all the sand castles cuz like the maps have connected spawn timers...? My friend told me and he's way smarter than you so go do it! <br> QUEST:Defeat Mafiosos and Sand Castles super fast",
                        "NextIndex": 8,
                        "Name": "Wait No, I meant Pathetic Gaming",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "StampC2", "quantity": 1}, <ComponentModel>{"item": "StampB18", "quantity": 1}],
                        "QuestName": "XxX Cattleprod XxX2",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "XxX Cattleprod XxX2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Mafiosos Defeated:", "finalV": 30, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{
                                "desc": "Sand Castles Defeated:",
                                "finalV": 18,
                                "type": "GreaterEqual",
                                "startV": 0
                            },
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 72}
                        ]
                    },
                    "Ok, NOW it's Peak Gaming!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well guess Ima go leave a 1 star rating and dip out... YO WAIT!! Go get me a BUNCH of 1 star Ratings mwahaha!! <br> QUEST:Collect ratings from mobs and ask other players whose names start with P or S to say '1 star game sucks!' to collect more ratings.",
                        "NextIndex": 13,
                        "Name": "Ok, NOW it's Peak Gaming!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 12,
                        "Rewards": [<ComponentModel>{"item": "StampA28", "quantity": 1}, <CoinRewardModel>{"item": "", "quantity": 20000}],
                        "QuestName": "XxX Cattleprod XxX3",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [
                            <ComponentModel>{"item": "Quest32", "quantity": 1000},
                            <ComponentModel>{"item": "Quest33", "quantity": 1},
                            <ComponentModel>{"item": "Quest34", "quantity": 1}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Cmon... cmonnnnNNNN!!! Spawn already!! GahhhHHHHH!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "This is so ANNOYING!!! I'm trynna spawn camp these noobs but they won't respawn! WTFFFF!!!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Uhhh No..?? I'm not on the wrong platform you dummy! Pfft you probably dont even know about this exploit you smooth brain!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Smh... look I'll PROVE it to you!! Go kill all the other mobs and I bet one will spawn right here! But you gotta do it quick or they'll just keep respawning up there! <br> QUEST:Kill all the Mafioso's before they respawn.",
                        "NextIndex": 5,
                        "Name": "Peak Gaming"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Dude I can't trade you!?! My inventory is empty so I think you need more Space!!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WTFF none spawned? Lava's spagetti code is probably messing things up... just do it again ok? I swear to Blob I got like a 50 killstreak yesterday with this strat before my mom made me log off.",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Wait no I remember!! You need to also kill all the sand castles cuz like the maps have connected spawn timers...? My friend told me and he's way smarter than you so go do it! <br> QUEST:Defeat Mafiosos and Sand Castles super fast",
                        "NextIndex": 8,
                        "Name": "Wait No, I meant Pathetic Gaming"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Dude I can't trade you!?! My inventory is empty so I think you need more Space!!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Ughhh they didn't respawn! So friggin annoying... I'm gonna go report this bug brb <br> Return at Class Lv. 55",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "DUDE I got BANNED from Lava's Discord! WTF I didn't even do anything!! I was just trying to help report the bug and I guess calling them all 'Smelly Buttfaces' when they told me it wasn't a bug triggered them or something!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I don't even care anymore. This game sucks anyway. I mean yea it was super fun and I played it for a few months to get this far but this one tiny bug which apparently isn't actually a bug TOTALLY ruins everything forever!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well guess Ima go leave a 1 star rating and dip out... YO WAIT!! Go get me a BUNCH of 1 star Ratings mwahaha!! <br> QUEST:Collect ratings from mobs and ask other players whose names start with P or S to say '1 star game sucks!' to collect more ratings.",
                        "NextIndex": 13,
                        "Name": "Ok, NOW it's Peak Gaming!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Dude I can't trade you!?! My inventory is empty so I think you need more Space!!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "OMG my reviews got REMOVED for spam!! So stupid they were all real too!! Whatever I got a Lucky Lad trophy yesterday anyway so this game is actually dope again!!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Woah nice Lucky Lad trophy! Kinda weird how it's under me and not you... oh right thats because it's MINE hahaha! <br> Hiyaa! Take that air!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Giftmas Blobulyte", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "Event",
                    "birthWeight": 2.4,
                    "starSign": "Capricorn",
                    "mothersMaidenName": "Taylor",
                    "notes": "'''Every day during Giftmas, you'll get to give ME gifts!! Hey dont gimme dat look! Not every event needs to be centered around you, ya know!'''$NEWLINE$$NEWLINE$The [[Giftmas Blobulyte]] was a blobulyte available during the [[Events#Christmas_Event|Christmas Event]] (December 29th 2020 to January 22nd 2021). Its daily quests awarded players {{CraftReq|Giftmas Box}} in exchange for [[Ghost (Event)|Ghost]] kills and rare/expensive items.$NEWLINE$"
                },
                "quests": {
                    "Boo, Headshot!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Bring me the gift of Immortality! I bet if u noscope those spooky Ghosts my body will never die for fear of having to fight you so I'll live forever! <br> QUEST:Defeat Giftmas Ghosts which have a rare chance to spawn from defeating normal monsters.",
                        "NextIndex": 6,
                        "Name": "Boo, Headshot!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 5,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest30", "quantity": 15},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 10},
                            <ComponentModel>{"item": "Timecandy2", "quantity": 1}
                        ],
                        "QuestName": "Giftmas Blobulyte1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Giftmas Blobulyte1",
                        "CustomArray": [<CustomReqModel>{"desc": "Ghosts Defeated:", "finalV": 6, "type": "GreaterEqual", "startV": 0}]
                    },
                    "You Shouldn't Have! No, really.": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Bring me the gift of tacky thoughtlessness! I want things that are expensive rare and of absolutely no use to me! <br> QUEST:Ah they mean cash and jewelry! Go get a dubloon and some shiny glass from Sandy Pots both from the Desert!",
                        "NextIndex": 9,
                        "Name": "You Shouldn't Have! No, really.",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [<ComponentModel>{"item": "Quest30", "quantity": 15}, <ComponentModel>{"item": "PremiumGem", "quantity": 10}],
                        "QuestName": "Giftmas Blobulyte2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "ItemReq": [<ComponentModel>{"item": "DesertA1b", "quantity": 1}, <ComponentModel>{"item": "Quest19", "quantity": 1}]
                    },
                    "Giftmas Time!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Last year was such a hassle so many different gifts! This year I'm keepin' it simple! <br> QUEST:Defeat 100 monsters.",
                        "NextIndex": 13,
                        "Name": "Giftmas Time!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 12,
                        "Rewards": [<ComponentModel>{"item": "Quest64", "quantity": 6}],
                        "QuestName": "Giftmas Blobulyte3",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Giftmas Blobulyte3",
                        "CustomArray": [<CustomReqModel>{"desc": "Mobs Defeated:", "finalV": 100, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I have presents for you! Come on inside!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hehe I'm joking my box is like 46 pixels wide you're too fat to fit!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well Merry Giftmas ya big gamer! And ye Giftmas is one day after your Christmas so technically that slowpoke lava dev wasn't actually late with the event! Of course I'm only saying that because he coded me to we both know he was late hehe!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Every day during Giftmas you'll get to give ME gifts!! Hey dont gimme dat look! Not every event needs to be centered around you ya know!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Bring me the gift of Immortality! I bet if u noscope those spooky Ghosts my body will never die for fear of having to fight you so I'll live forever! <br> QUEST:Defeat Giftmas Ghosts which have a rare chance to spawn from defeating normal monsters.",
                        "NextIndex": 6,
                        "Name": "Boo, Headshot!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Free up 2 inventory so I can give you these meaningless boxes in return for you giving me the gift I wanted!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aw yee now I'll live forever! ... <br> ... <br> ...ok I'm bored of that gift. I want some REAL presents something material consumeristic something that's never boring...",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Bring me the gift of tacky thoughtlessness! I want things that are expensive rare and of absolutely no use to me! <br> QUEST:Ah they mean cash and jewelry! Go get a dubloon and some shiny glass from Sandy Pots both from the Desert!",
                        "NextIndex": 9,
                        "Name": "You Shouldn't Have! No, really."
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Free up 2 inventory so I can give you these meaningless boxes in return for you giving me the gift I wanted!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Cheerio for the giftio player! It's about darn time us NPC's got an event! And of course by us NPC's I mean just me hehe! <br> COME BACK TOMORROW AND I-- sorry Caps! Come back tomorrow I'll let you give me gifts again!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "It's giftmas time! Oh boy oh boy I hated not existing for the last 11 months I'm so happy to be back!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Last year was such a hassle so many different gifts! This year I'm keepin' it simple! <br> QUEST:Defeat 100 monsters.",
                        "NextIndex": 13,
                        "Name": "Giftmas Time!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Free up 1 inventory so I can give you these presents!",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Here you go! Cmon open them open them!! Oh and I've got more left so come back tomorrow!!! ##",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Telescope", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Where The Branches End",
                    "world": "Blunder Hills",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 8.82,
                    "starSign": "Sagittarius",
                    "mothersMaidenName": "Harris",
                    "notes": "The [[Telescope]] is found in [[Worlds#T3 - Where the Branches End|Where the Branches End]], the third zone of the tree, located at the top left of the area.$NEWLINE$$NEWLINE$Reaching and using the Telescope allows the players character to change [[Star Signs]] and unlock new Star Signs if they have enough Star Chart Points.$NEWLINE$"
                },
                "quests": {
                    "I'm Seeing Stars!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "'Go complete Constellation A-2. It's right there on the bottom right branch then the telescope will be usable!' <br> QUEST:Follow the engraving's advice and press the little constellation on the bottom right branch.",
                        "NextIndex": 6,
                        "Name": "I'm Seeing Stars!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 5,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy2", "quantity": 2},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 10},
                            <ComponentModel>{"item": "Timecandy3", "quantity": 2}
                        ],
                        "QuestName": "Telescope1",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": " The constellation is on the same map as the telescope, you need to afk 1h in order to complete it"
                        },
                        "CustomType": "Telescope1",
                        "CustomArray": [<CustomReqModel>{"desc": "Constellation A-2:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "The engraving on the side says 'High Power Hubble Telescope capable of over 500000x magnification...'",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'...which means you'll finally be able to read the font in this game without hurting your eyes!' <br> The engraving continues on:",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Before you use the telescope you must find constellations. There are dozens all across the game! There's even one on this map...",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'...do you see it? It's on the bottom right branch. If you can complete its challenge it will forever light up and youll get points to spend on new Star Signs!' <br> The engraving continues on:",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "'Go complete Constellation A-2. It's right there on the bottom right branch then the telescope will be usable!' <br> QUEST:Follow the engraving's advice and press the little constellation on the bottom right branch.",
                        "NextIndex": 6,
                        "Name": "I'm Seeing Stars!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Please empty 2 inventory spaces!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh no there's still more engravi- <br> 'Anyway as I was saying before I got interrupted there are constellations all over the game so always look out for them wherever you go! There's also a trophy if you can light up them all!' <br> The engraving pops out of the telescope and falls down the tree.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Loveulyte", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Yes",
                    "type": "Event",
                    "birthWeight": 9.37,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Williams",
                    "notes": "'''Roses are red, blobulytes are cute, go run my errands and I'll give you some loot!'''$NEWLINE$$NEWLINE$The [[Loveulyte]] was a blobulyte available during the [[Events#Valenslimes_Day|Valentines Event]] (February 24th 2021 to March 8th 2021). Its daily quests awarded players {{CraftReq|Choco Box}} in exchange for {{CraftReq|Lovey Dovey Letter}} and [[Valentslime]] kills.$NEWLINE$"
                },
                "quests": {
                    "Heart Hogger": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "All through the land the monsters are happy go steal their joy and make their day crappy! <br> QUEST:Defeat monsters and collect their old Love Letters for this joy-hogging blobulyte.",
                        "NextIndex": 4,
                        "Name": "Heart Hogger",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest40", "quantity": 15},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 10},
                            <ComponentModel>{"item": "Timecandy1", "quantity": 1}
                        ],
                        "QuestName": "Loveulyte1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": "All enemies can drop the letters. Daily quest"},
                        "ItemReq": [<ComponentModel>{"item": "Quest39", "quantity": 25}]
                    },
                    "Heartbreaker": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So go summon some Valenslimes! Hold down on the letters and make them pay for their crimes! <br> QUEST:Hold down on Love Letters and break some hearts!",
                        "NextIndex": 7,
                        "Name": "Heartbreaker",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "Quest40", "quantity": 15}, <ComponentModel>{"item": "PremiumGem", "quantity": 10}],
                        "QuestName": "Loveulyte2",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Consume 5 {{CraftReq|Lovey Dovey Letter}} to summon a [[Valentslime]]. Daily quest."
                        },
                        "CustomType": "Loveulyte2",
                        "CustomArray": [<CustomReqModel>{"desc": "Defeat Heart Slimes:", "finalV": 20, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Roses are red blobulytes are cute go run my errands and I'll give you some loot!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "From now until March 8th I'll be around so try to get some goodies before I can't be found!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "All through the land the monsters are happy go steal their joy and make their day crappy! <br> QUEST:Defeat monsters and collect their old Love Letters for this joy-hogging blobulyte.",
                        "NextIndex": 4,
                        "Name": "Heart Hogger"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Free up 3 inventory spaces for rewards! You've got a big heart but unfortunately your bag isn't so big.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yippie!! None for them and all for me as it should be! But still there is happiness as you can see you must steal it all I decree!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So go summon some Valenslimes! Hold down on the letters and make them pay for their crimes! <br> QUEST:Hold down on Love Letters and break some hearts!",
                        "NextIndex": 7,
                        "Name": "Heartbreaker"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Free up 2 inventory spaces for rewards! You've got a big heart but unfortunately your bag isn't so big.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Alas I must admit. The loneliness I feel up here has broken my spirit. Neither cards from lovers nor destruction of others can bring to me what we all hold dearest. Please return tomorrow so we may try one more to ease my sorrow.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Alas I must admit. The loneliness I feel up here has broken my spirit. Neither cards from lovers nor destruction of others can bring to me what we all hold dearest. Please return tomorrow so we may try one more to ease my sorrow.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Egggulyte", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Daily",
                    "type": "Event",
                    "birthWeight": 5.65,
                    "starSign": "Pisces",
                    "mothersMaidenName": "Sanchez",
                    "notes": "'''Im Eg,' 'I'm Egg,' 'I'm... wait which one am I again?'''$NEWLINE$$NEWLINE$The [[Egggulyte]] are a trio of blobulytes available during the [[Events/Easter|Easter Event]]. Their daily quests award players {{CraftReq|Egg Capsule}}s, {{CraftReq|Gummy Bunny}}s, and {{CraftReq|Gem}}s for finding {{CraftReq|Egg Capsule}} and {{CraftReq|Goldegg Capsule}}.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Egg Shaped Lootboxes!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Dang it eggy! You're <br> . <br> messing up our Dialogue! <br> QUEST:Defeat monsters and find some egg capsules! Open them for rewards!",
                        "NextIndex": 5,
                        "Name": "Egg Shaped Lootboxes!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest42", "quantity": 5},
                            <ComponentModel>{"item": "Quest43", "quantity": 3},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 5}
                        ],
                        "QuestName": "Egggulyte1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Egggulyte1",
                        "CustomArray": [<CustomReqModel>{"desc": "Open Egg Capsule:", "finalV": 5, "type": "GreaterEqual", "startV": 0}]
                    },
                    "I've Got a Golden Tickegg!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Whatever. Anyway <br> . <br> we also hid a golden <br> . <br> oh I know this one!!! A golden egg in one of the capsules! We want you to find it and open it! <br> QUEST:Open Egg Capsules until you find a Golden Egg! Previously found ones don't count!",
                        "NextIndex": 9,
                        "Name": "I've Got a Golden Tickegg!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [
                            <ComponentModel>{"item": "Quest42", "quantity": 7},
                            <ComponentModel>{"item": "Quest43", "quantity": 5},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 5}
                        ],
                        "QuestName": "Egggulyte2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Egggulyte2",
                        "CustomArray": [<CustomReqModel>{"desc": "Find New Gold Egg:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Hi!' <br> . <br> 'Hey!' <br> . <br> 'Huh?'",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Im Eg <br> . <br> I'm Egg <br> . <br> I'm... wait which one am I again? The orange one? <br> . <br> And we are the <br> . <br> Easter Egggies! <br> . <br> ...Easter Eggies! Oh you're the orange one whoops!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "To celebrate Spring we hid <br> . <br> lots of Egg Capsules! Would <br> . <br> ... wait wood? We didn't hide any wood we only hid Egg Capsules and Candy!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Dang it eggy! You're <br> . <br> messing up our Dialogue! <br> QUEST:Defeat monsters and find some egg capsules! Open them for rewards!",
                        "NextIndex": 5,
                        "Name": "Egg Shaped Lootboxes!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 2 open <br> . <br> spaces in your inventory <br> . <br> for some reason! Ugh today is NOT my day...",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Super good job opening <br> . <br> those capsules! You should be very proud <br> . <br> to be able to open them because I can't figure out how to myself!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Sigh' Dang it Eggy <br> . <br> we've shown you like 4 times how to open them. <br> . <br> I'm sorry you guys you know I dont understand things sometimes!!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Whatever. Anyway <br> . <br> we also hid a golden <br> . <br> oh I know this one!!! A golden egg in one of the capsules! We want you to find it and open it! <br> QUEST:Open Egg Capsules until you find a Golden Egg! Previously found ones don't count!",
                        "NextIndex": 9,
                        "Name": "I've Got a Golden Tickegg!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need 2 open <br> . <br> spaces in your inventory <br> . <br> for some reason! Ugh today is NOT my day...",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You found one! Thats <br> . <br> very impressive! Come <br> . <br> back tomorrow to find more capsules! <br> . <br> Good job Eggy! <br> . <br> Yea nice! <br> . <br> Haha thx guys #",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Iceland Irwin", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Frostbite Towndra",
                    "world": "Frostbite Tundra",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 3.35,
                    "starSign": "Virgo",
                    "mothersMaidenName": "Cast",
                    "notes": "[[Iceland Irwin]] is the [[Tasks|Taskmaster]] of Frostbite Tundra. You can find him in [[Worlds#Frostbite Towndra|Frostbite Towndra]].$NEWLINE$$NEWLINE$You can complete his quest to unlock [[Tasks/Frostbite Tundra|World 3 Tasks]].$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Crikey, it's cold out!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If ya really wanna take on my tasks ya gotta bring me back some frosty flake melty cubes! <br> QUEST:Go defeat Frost Flakes past the Sheepies and collect their cool shapes!",
                        "NextIndex": 4,
                        "Name": "Crikey, it's cold out!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "PremiumGem", "quantity": 25},
                            <ComponentModel>{"item": "Timecandy3", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy1", "quantity": 2}
                        ],
                        "QuestName": "Iceland Irwin1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "SnowA2", "quantity": 250}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oi mate! I reckon it's a bit cold out 'ere for a half naked fella like yourself! It's a darn shame you humans aren't born with a snowman heater on ya noggin like I am would do you wonders in the frozen outback!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Now hang on just a tick mate! I'm not messin' around when I say it's cold out there... I can't be givin' ya my tasks until I know you wont freeze to death!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If ya really wanna take on my tasks ya gotta bring me back some frosty flake melty cubes! <br> QUEST:Go defeat Frost Flakes past the Sheepies and collect their cool shapes!",
                        "NextIndex": 4,
                        "Name": "Crikey, it's cold out!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Whoa there mate! Clear up 3 spaces so I can getcha your goodies!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Right-o then mate! Go get those tasks!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Hoggindaz", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Frostbite Towndra",
                    "world": "Frostbite Tundra",
                    "noQuest": 10,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 3.42,
                    "starSign": "Sagittarius",
                    "mothersMaidenName": "Jenson",
                    "notes": "[[Hoggindaz]] is found in [[Worlds#Frostbite Towndra|Frostbite Towndra]], at the bottom right of town. $NEWLINE$$NEWLINE$His quests introduce the basics of [[Construction]], [[Trapping]] and [[Worship]] to the player. His quests award special talents that allow the sampling resources for the 3D Printer and moving shrines.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Turn ON for what???": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "First up the Refinery! See that smoke machine up there? Go turn it on and collect the fuel it needs into your Storage Chest! <br> QUEST:Turn on Redox Combustion in the refinery and collect Mushroom Caps and Copper Ore until you have 24 hours of fuel.",
                        "NextIndex": 5,
                        "Name": "Turn ON for what???",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 3}],
                        "QuestName": "Hoggindaz1",
                        "Difficulty": 1,
                        "note": <NoteModel>{
                            "note": "At rank 1, the refinery uses 10 Spore Caps and 5 Copper Ore every 15 minutes. You need at least 960 Spore Caps and 480 Copper Ore in your storage chest."
                        },
                        "CustomType": "Hoggindaz1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Refinery Turned On:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Hours of Redox Fuel:", "finalV": 24, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Trapping with the Lord": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go to the woods map over to the left and talk to the Lord of the Hunt. He will explain Trapping better than I ever could! <br> QUEST:Go to the map to the left and learn about the Trapping Skill.",
                        "NextIndex": 9,
                        "Name": "Trapping with the Lord",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [<ComponentModel>{"item": "Timecandy1", "quantity": 1}, <ComponentModel>{"item": "PremiumGem", "quantity": 4}],
                        "QuestName": "Hoggindaz2",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "You must complete the [[Lord of the Hunt]]'s first quest to have the ability to place traps in the jungle ([[Slime]] map)"
                        },
                        "CustomType": "Hoggindaz2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Buy Trap from Shop:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{
                                "desc": "Place a Trap in Jungle:",
                                "finalV": 1,
                                "type": "GreaterEqual",
                                "startV": 0
                            }
                        ]
                    },
                    "Constructing a Tower": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "See that Workbench? Try building the first two buildings! GO TO THE 'COG' TAB TO GET BUILD SPEED!! Sorry to yell hehehe I just really like cogs is all! <br> QUEST:Build the Red and Orange Signposts and also make some Cogs by going to the 'Cog' Tab and opening the Cog Shelf and dragging in some players.",
                        "NextIndex": 12,
                        "Name": "Constructing a Tower",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <TalentRewardModel>{"item": "TalentBook1", "quantity": 3635100},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 2}
                        ],
                        "QuestName": "Hoggindaz3",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Collect a cog on the character with this quest active. Cogs collected by another character won't count. Wizard Defenders are in the middle row."
                        },
                        "CustomType": "Hoggindaz3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "3D Printer Built:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Wizard Defender Built:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Cogs Made:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Monke Tower Time!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go to the totem in the Glublin Forest. You probably know it as 'that totem thing that I don't know what it is'. <br> QUEST:Start a round of Tower Defence by going to the Goblin Map in World 1. Also equip that wax skull!",
                        "NextIndex": 17,
                        "Name": "Monke Tower Time!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 16,
                        "Rewards": [<ComponentModel>{"item": "Timecandy1", "quantity": 1}, <ComponentModel>{"item": "PremiumGem", "quantity": 2}],
                        "QuestName": "Hoggindaz4",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "You need at least 25% charge to play a round of [[Worship]] at the [[Glublin]] totem. Purchase and equip a {{CraftReq|Ceramic Skull}} from the W3 town shop to gain charge. Charge is per-character, not account wide."
                        },
                        "CustomType": "Hoggindaz4",
                        "CustomArray": [
                            <CustomReqModel>{
                                "desc": "Summon Goblin Gorefest:",
                                "finalV": 1,
                                "type": "GreaterEqual",
                                "startV": 0
                            },
                            <CustomReqModel>{"desc": "Place Wizard Towers:", "finalV": 4, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Taking Samples": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Use the Star Book and level up the talent once. Then drag it into your Attack bar and use it in any map! <br> Take samples using your new Star Talent! Just don't do it in Town... <br> QUEST:Use the Star Book then add the talent to your attack bar and take samples!",
                        "NextIndex": 21,
                        "Name": "Taking Samples",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 20,
                        "Rewards": [
                            <TalentRewardModel>{"item": "TalentBook1", "quantity": 3639100},
                            <ComponentModel>{"item": "PremiumGem", "quantity": 2}
                        ],
                        "QuestName": "Hoggindaz5",
                        "Difficulty": 1,
                        "note": <NoteModel>{
                            "note": "You must be in a map with AFK info of an activity in order to sample it. For instance, go to the [[Green Mushroom]] map or the [[Copper Ore]] mining area, then activate the talent. You can then print whatever you sampled in the 3D printer. Until you upgrade your printer in construction, only your first character can take samples."
                        },
                        "CustomType": "Hoggindaz5",
                        "CustomArray": [<CustomReqModel>{"desc": "Take Samples:", "finalV": 2, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Voter Recognition": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hmm which voter should we target first? How about Shuvelle? She's out in the Mamooth map. She's a hardline ICE Party member and will surely declare her vote! <br> QUEST:Get Shuvelle's Vote for Hoggi.",
                        "NextIndex": 27,
                        "Name": "Voter Recognition",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 26,
                        "Rewards": [<ComponentModel>{"item": "Timecandy2", "quantity": 3}],
                        "QuestName": "Hoggindaz6",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest59", "quantity": 1}]
                    },
                    "Voter Appeasement": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Now then lets shift our focus to the '65 and over' demographic that's where all the donations come from! I bet Yondergreen would fit right in he was a contract lawyer after all! <br> QUEST:Get Yondergreen's Vote for Hoggi.",
                        "NextIndex": 30,
                        "Name": "Voter Appeasement",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 29,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 2}],
                        "QuestName": "Hoggindaz7",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest60", "quantity": 1}]
                    },
                    "Voter Apathy": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "So who is even left... uh oh. There's gotta be someone other than Bill right? No? Ugh I don't think that guy's ever voted for ANYONE but he's our only shot so lets get to it! <br> QUEST: Get Bill Brr's Vote for Hoggi.",
                        "NextIndex": 33,
                        "Name": "Voter Apathy",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 32,
                        "Rewards": [<ComponentModel>{"item": "Timecandy4", "quantity": 1}],
                        "QuestName": "Hoggindaz8",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest61", "quantity": 1}]
                    },
                    "Chizoar No More": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "My first order as Mayor is for you to go defeat that world boss who invaded just before the election! Come to think of it why didn't I do that back then I was still mayor... QUEST:Defeat Chizoar the World 3 Boss.",
                        "NextIndex": 38,
                        "Name": "Chizoar No More",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 37,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken32", "quantity": 1},
                            <ComponentModel>{"item": "ExpBalloon3", "quantity": 2},
                            <ComponentModel>{"item": "ExpBalloon2", "quantity": 4}
                        ],
                        "QuestName": "Hoggindaz9",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Hoggindaz9",
                        "CustomArray": [<CustomReqModel>{"desc": "Chizoar Defeated:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Fresh Prince of the Tundra": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "How would you like to be my prince? Prince's are a step below Mayors in this world but it's still a step up from whatever title you have no offence! <br> QUEST:Prove your worthiness as the Tundra's Frost Prince.",
                        "NextIndex": 41,
                        "Name": "The Fresh Prince of the Tundra",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 40,
                        "Rewards": [<ComponentModel>{"item": "Trophy15", "quantity": 1}],
                        "QuestName": "Hoggindaz10",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [
                            <ComponentModel>{"item": "BadgeI1", "quantity": 1},
                            <ComponentModel>{"item": "BadgeI2", "quantity": 1},
                            <ComponentModel>{"item": "BadgeI3", "quantity": 1}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hi! My name is Hoggi and I am the mayor of Frostbite Tundra Town! Of course we just call it Frostbite Towndra hehe!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Anyway I've been waiting for someone like you to come around for ages!! No seriously wasn't the release of this world delayed by a few weeks?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well you're here now! Better get started before all those early players get too far ahead of you! Let me show you what our world has to offer...",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "First up the Refinery! See that smoke machine up there? Go turn it on and collect the fuel it needs into your Storage Chest! <br> QUEST:Turn on Redox Combustion in the refinery and collect Mushroom Caps and Copper Ore until you have 24 hours of fuel.",
                        "NextIndex": 5,
                        "Name": "Turn ON for what???"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You figured that out pretty quickly! Most people just take one look at it and go straight to Lava to ask him how it works...",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "While we wait for the refinery to produce some salts lets start Trapping!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go to the woods map over to the left and talk to the Lord of the Hunt. He will explain Trapping better than I ever could! <br> QUEST:Go to the map to the left and learn about the Trapping Skill.",
                        "NextIndex": 9,
                        "Name": "Trapping with the Lord"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Nice you did it! <br> Anyway let's start some Construction!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "See that Workbench? Try building the first two buildings! GO TO THE 'COG' TAB TO GET BUILD SPEED!! Sorry to yell hehehe I just really like cogs is all! <br> QUEST:Build the Red and Orange Signposts and also make some Cogs by going to the 'Cog' Tab and opening the Cog Shelf and dragging in some players.",
                        "NextIndex": 12,
                        "Name": "Constructing a Tower"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well package me up and sell me without a spoon you hardly even need my help! Let me show you one last thing before you go though.",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "It's the 3rd skill of this world Worship! It's an extremely complex skill with very nuanced strategy and and rules!",
                        "NextIndex": 14,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... ok it's basically just the Monkey Ballon game.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Go to the totem in the Glublin Forest. You probably know it as 'that totem thing that I don't know what it is'. <br> QUEST:Start a round of Tower Defence by going to the Goblin Map in World 1. Also equip that wax skull!",
                        "NextIndex": 17,
                        "Name": "Monke Tower Time!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well thats it! <br> ... ok oooone last thing super quick! It's super important!",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Remember those star books I gave you? Well one of them lets you collect samples for the 3d printer!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Use the Star Book and level up the talent once. Then drag it into your Attack bar and use it in any map! <br> Take samples using your new Star Talent! Just don't do it in Town... <br> QUEST:Use the Star Book then add the talent to your attack bar and take samples!",
                        "NextIndex": 21,
                        "Name": "Taking Samples"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well thats it! That's all I had to tell you and since there's no evil boss or anything in this world and definitely never will be there's nothing left for me to say!",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Erm... scratch that apparently the world boss just got coded up and has taken over a large tunnel in the Crystal Catacombs...",
                        "NextIndex": 23,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well as the Mayor of this world I guess it falls on me to fix this!!! If not I may lose my position next election!",
                        "NextIndex": 24,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "...oooooooor I could NOT fix it and instead just pander to my voter base to get re-elected! Yea let's do that instead!",
                        "NextIndex": 25,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hmm which voter should we target first? How about Shuvelle? She's out in the Mamooth map. She's a hardline ICE Party member and will surely declare her vote! <br> QUEST:Get Shuvelle's Vote for Hoggi.",
                        "NextIndex": 27,
                        "Name": "Voter Recognition"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 25,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Fantastic! We only need two more signatures to guarantee a victory since descrimination laws in this world prevent Pigs and Humans from casting a vote.",
                        "NextIndex": 28,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Now then lets shift our focus to the '65 and over' demographic that's where all the donations come from! I bet Yondergreen would fit right in he was a contract lawyer after all! <br> QUEST:Get Yondergreen's Vote for Hoggi.",
                        "NextIndex": 30,
                        "Name": "Voter Appeasement"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 28,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well done! We only need one more signature and re-election will be mine!",
                        "NextIndex": 31,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "So who is even left... uh oh. There's gotta be someone other than Bill right? No? Ugh I don't think that guy's ever voted for ANYONE but he's our only shot so lets get to it! <br> QUEST: Get Bill Brr's Vote for Hoggi.",
                        "NextIndex": 33,
                        "Name": "Voter Apathy"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 31,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You got it?? Oh you filled it out I see... meh what's an election without a bit of corruption right? I'm sure if we weren't just 2d drawings we would be more than capable of doing without corruption!",
                        "NextIndex": 34,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.LevelReq,
                        "DialogueText": "Just gotta wait for the election results to come through! <br> Return at Class Lv. 80",
                        "NextIndex": 35,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I won the popular vote!!! Fortunately the popular vote is what determines who wins the election here since how else would an election work?",
                        "NextIndex": 36,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "My first order as Mayor is for you to go defeat that world boss who invaded just before the election! Come to think of it why didn't I do that back then I was still mayor... QUEST:Defeat Chizoar the World 3 Boss.",
                        "NextIndex": 38,
                        "Name": "Chizoar No More"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 36,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You really are resourceful almost as resource-full as your storage chest haha! <br> I've been thinking though...",
                        "NextIndex": 39,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "How would you like to be my prince? Prince's are a step below Mayors in this world but it's still a step up from whatever title you have no offence! <br> QUEST:Prove your worthiness as the Tundra's Frost Prince.",
                        "NextIndex": 41,
                        "Name": "The Fresh Prince of the Tundra"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 31,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You got it?? Oh you filled it out I see... meh what's an election without a bit of corruption right? I'm sure if we weren't just 2d drawings we would be more than capable of doing without corruption!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Bill Brr", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Overpass of Sound",
                    "world": "Frostbite Tundra",
                    "noQuest": 7,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 2.05,
                    "starSign": "Capricorn",
                    "mothersMaidenName": "Upson",
                    "notes": "[[Bill Brr]] is located in the [[Worlds#Overpass of Sound|Overpass of Sound]].$NEWLINE$"
                },
                "quests": {
                    "Fairly Odd Damage": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Look buddy it's not all about you. How about you do somethin' for me first yea? Got any jokes anything real odd that might lighten my morning? <br> QUEST:Deal an 'odd' amount of damage 8 times in a row.",
                        "NextIndex": 4,
                        "Name": "Fairly Odd Damage",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "ExpBalloon2", "quantity": 5}, <ComponentModel>{"item": "PremiumGem", "quantity": 3}],
                        "QuestName": "Bill Brr1",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "This is easily done in [[Worship]] where your character attacks all do only 1 damage."
                        },
                        "CustomType": "Bill Brr1",
                        "CustomArray": [<CustomReqModel>{"desc": "Odd Dmg in a Row:", "finalV": 8, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Laughin' Amphibian": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Maybe you need a bit of help? Here I hid one of my old jokes in this frog's loot table. Just kill it and read me the joke and you can have your vote. <br> QUEST:Defeat the Giga Frog with Bill's joke in it.",
                        "NextIndex": 7,
                        "Name": "Laughin' Amphibian",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 1}, <ComponentModel>{"item": "PremiumGem", "quantity": 4}],
                        "QuestName": "Bill Brr2",
                        "Difficulty": 2,
                        "note": <NoteModel>{
                            "note": "The Gigafrog is always shielded, you must kill it with the shield up. Unequip HP-increasing Prayers to avoid extending the fight. Attacking the Gigafrog with a bow will cause it to glitch out. Archers should unequip your bow before spawning the Gigafrog."
                        },
                        "CustomType": "Bill Brr2",
                        "CustomArray": [<CustomReqModel>{"desc": "Frog Defeated:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Spores are a Bore": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I'm gonna spawn a bunch of mobs and you gotta avoid hurting the Spores but kill the other ones. <br> QUEST:Do the thingy for this annoying ham slice.",
                        "NextIndex": 11,
                        "Name": "The Spores are a Bore",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 10,
                        "Rewards": [<ComponentModel>{"item": "Timecandy2", "quantity": 2}],
                        "QuestName": "Bill Brr3",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Spears do AOE damage and should be unequipped to avoid killing the mushrooms by accident."
                        },
                        "CustomType": "Bill Brr3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Cryo Kills:", "finalV": 3, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Spores Unharmed:", "finalV": 1, "type": "GreaterEqual", "startV": 1}
                        ]
                    },
                    "Coin Shenanigans": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Pick up that coin. Just run over to it easy peasy! <br> QUEST:Pick up the coin by running over it.",
                        "NextIndex": 14,
                        "Name": "Coin Shenanigans",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "Quest61", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 1}],
                        "QuestName": "Bill Brr4",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Bill Brr4",
                        "CustomArray": [<CustomReqModel>{"desc": "Coin Collected:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Have a Candy": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Jeez you're still here? Can't you tell I don't really wanna socialize with the likes of you? Eh whatever... got any candies on ya? QUEST:Give Bill some candy.",
                        "NextIndex": 17,
                        "Name": "Have a Candy",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 16,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 3}],
                        "QuestName": "Bill Brr5",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Timecandy1", "quantity": 5}, <ComponentModel>{"item": "Timecandy2", "quantity": 2}]
                    },
                    "Duckin' and Shatterin'": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You know what? You're an alright dude how about a little competition? See if you can take out 18 ice orbs while fighting Chizoar without getting hit. <br> QUEST:Do what he just said why do I have to say it over again?",
                        "NextIndex": 20,
                        "Name": "Duckin' and Shatterin'",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 19,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 2}],
                        "QuestName": "Bill Brr6",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Bill Brr6",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Orbs Shattered:", "finalV": 18, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "No Injury:", "finalV": 1, "type": "GreaterEqual", "startV": 1}
                        ]
                    },
                    "Hatin' on the Green One": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Just a small thing really I just wanna see you defeat Chaotic Chizoar. No biggie right? <br> QUEST:Defeat C. Chizoar.",
                        "NextIndex": 23,
                        "Name": "Hatin' on the Green One",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 22,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken37", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 2}],
                        "QuestName": "Bill Brr7",
                        "Difficulty": 8,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Bill Brr7",
                        "CustomArray": [<CustomReqModel>{"desc": "C. Chizoar Killed:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Brrr.... Anyway so I walked up to the guy right? And I just started going off on him about some bridge ahh you should've seen 'em! The look on their face hah!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What's that? You want my vote? Vote for who some puppet? No they're all puppets dude stop lying to yourself.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Look buddy it's not all about you. How about you do somethin' for me first yea? Got any jokes anything real odd that might lighten my morning? <br> QUEST:Deal an 'odd' amount of damage 8 times in a row.",
                        "NextIndex": 4,
                        "Name": "Fairly Odd Damage"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Pfftahaha! What on earth was that why would you think that floating numbers would make me laugh?? I mean you got me laughin' but not at your stupid numbers...",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Maybe you need a bit of help? Here I hid one of my old jokes in this frog's loot table. Just kill it and read me the joke and you can have your vote. <br> QUEST:Defeat the Giga Frog with Bill's joke in it.",
                        "NextIndex": 7,
                        "Name": "Laughin' Amphibian"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "No way hahaha no way! You actually believed it!! Dude why would I want to hear an old joke of mine and how do you put a joke into a loot table?? Jeez...",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm sorry hahaha... look I'm just messing with ya. You're a good sport just do a few more things and you can have the vote.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I'm gonna spawn a bunch of mobs and you gotta avoid hurting the Spores but kill the other ones. <br> QUEST:Do the thingy for this annoying ham slice.",
                        "NextIndex": 11,
                        "Name": "The Spores are a Bore"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "See? There ya go that ain't so bad nothing to be so upset about! I've got one more little thing for ya then the vote is yours I swear!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Pick up that coin. Just run over to it easy peasy! <br> QUEST:Pick up the coin by running over it.",
                        "NextIndex": 14,
                        "Name": "Coin Shenanigans"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What a riot!!! I can't believe you're so gullible... dude I ain't voting for no one. You can have this stupid ballot back BLANK because again I ain't voting for no puppet politicians.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Jeez you're still here? Can't you tell I don't really wanna socialize with the likes of you? Eh whatever... got any candies on ya? QUEST:Give Bill some candy.",
                        "NextIndex": 17,
                        "Name": "Have a Candy"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Thanks pal here I've got some candies to trade ya. I don't like green flavor anyway and I'm not here to steal items from ya.",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "You know what? You're an alright dude how about a little competition? See if you can take out 18 ice orbs while fighting Chizoar without getting hit. <br> QUEST:Do what he just said why do I have to say it over again?",
                        "NextIndex": 20,
                        "Name": "Duckin' and Shatterin'"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Not bad not bad. But I wont lie to ya I'm tired of seeing that blank face of yours. How about we do one last thing and call it quits?",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Just a small thing really I just wanna see you defeat Chaotic Chizoar. No biggie right? <br> QUEST:Defeat C. Chizoar.",
                        "NextIndex": 23,
                        "Name": "Hatin' on the Green One"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Not bad not bad. But I wont lie to ya I'm tired of seeing that blank face of yours. How about we do one last thing and call it quits?",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Bellows", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Crystal Basecamp",
                    "world": "Frostbite Tundra",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.06,
                    "starSign": "Leo",
                    "mothersMaidenName": "Lawless",
                    "notes": "[[Bellows]] is located in [[Worlds#Crystal Basecamp|Crystal Basecamp]].$NEWLINE$$NEWLINE$Upon completing his third quest the player is awarded with the ability to talk to him once every day to obtain a {{CraftReq|Chizoar's Cavern Key}}. He will hold keys for you for up to 3 days. Having more characters complete his third quest provides more daily keys, and one character can collect all of your daily keys at once.$NEWLINE$"
                },
                "quests": {
                    "Poking Some Eyes Out": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hi... please go kill... <br> all those eyeballs... thanks... <br> QUEST:Kill 50 Neyeptunes actively. No AFKing",
                        "NextIndex": 3,
                        "Name": "Poking Some Eyes Out",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "Key3", "quantity": 1}],
                        "QuestName": "Bellows1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Bellows1",
                        "CustomArray": [<CustomReqModel>{"desc": "Neyeptunes Killed:", "finalV": 50, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Eyexperience": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I love exp... go get exp... <br> but like... a lot of it... <br> all at once... <br> QUEST:Get at least 3200 EXP from a single Neyeptune kill",
                        "NextIndex": 6,
                        "Name": "Eyexperience",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 5,
                        "Rewards": [<ComponentModel>{"item": "Key3", "quantity": 2}],
                        "QuestName": "Bellows2",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Bellows2",
                        "CustomArray": [<CustomReqModel>{"desc": "Single Kill XP:", "finalV": 3200, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Veyebing": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ok then... how about... <br> we go big... or go home... <br> QUEST:Defeat a Giant Neyeptune monster. You must have Tachion of the Titan Prayer equipped to get Giant monsters to spawn.",
                        "NextIndex": 9,
                        "Name": "Veyebing",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 8,
                        "Rewards": [<ComponentModel>{"item": "Key3", "quantity": 2}],
                        "QuestName": "Bellows3",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "You must equip the [[Worship#Tachion_of_the_Titans|Tachion of the Titans]] Prayer to spawn Giant Monsters. Complete this quest to earn daily {{CraftReq|Chizoar's Cavern Key}}s."
                        },
                        "CustomType": "Bellows3",
                        "CustomArray": [<CustomReqModel>{"desc": "Giant Eye's Killed:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Optometric Hoarder": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Last thing... I want... <br> too see... a BUNCH of items... <br> All at once... <br> QUEST:Have a bunch of lenses in your inventory at once. They wont take them they just wants to see them.",
                        "NextIndex": 12,
                        "Name": "Optometric Hoarder",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 11,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken33", "quantity": 1}],
                        "QuestName": "Bellows4",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "SnowC4a", "quantity": 4}, <ComponentModel>{"item": "SnowC4", "quantity": 14000}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Breathe in... Breathe out... <br> Breathe in... Breathe out... <br> Breathe in... Breathe out...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hi... please go kill... <br> all those eyeballs... thanks... <br> QUEST:Kill 50 Neyeptunes actively. No AFKing",
                        "NextIndex": 3,
                        "Name": "Poking Some Eyes Out"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You dont... have enough... <br> inventory space... clear some up...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh... that was good... <br> Here... take these...",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I love exp... go get exp... <br> but like... a lot of it... <br> all at once... <br> QUEST:Get at least 3200 EXP from a single Neyeptune kill",
                        "NextIndex": 6,
                        "Name": "Eyexperience"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You dont... have enough... <br> inventory space... clear some up...",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wow... that was cool... <br> Wish I had... that exp multi...",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ok then... how about... <br> we go big... or go home... <br> QUEST:Defeat a Giant Neyeptune monster. You must have Tachion of the Titan Prayer equipped to get Giant monsters to spawn.",
                        "NextIndex": 9,
                        "Name": "Veyebing"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You dont... have enough... <br> inventory space... clear some up...",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've got... the vibes... <br> and I've got... the keys... <br> Every day... you can have more keys...",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Last thing... I want... <br> too see... a BUNCH of items... <br> All at once... <br> QUEST:Have a bunch of lenses in your inventory at once. They wont take them they just wants to see them.",
                        "NextIndex": 12,
                        "Name": "Optometric Hoarder"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You dont... have enough... <br> inventory space... clear some up...",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You've got... the vibes... <br> and I've got... the keys... <br> Every day... you can have more keys...",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Crystalswine", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Cryo Catacombs",
                    "world": "Frostbite Tundra",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 8.75,
                    "starSign": "Leo",
                    "mothersMaidenName": "Vogal",
                    "notes": "[[Crystalswine]] is found in [[Worlds#Cryo Catacombs|Cryo Catacombs]].$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Melting the Snakes": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The note continues: <br> 'You can have my Stamps too if you like just prove yourself first.' QUEST:Defeat all the Cryosnakes in this map before time runs out",
                        "NextIndex": 8,
                        "Name": "Melting the Snakes",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <ComponentModel>{"item": "StampA22", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy2", "quantity": 1},
                            <ComponentModel>{"item": "GemP16", "quantity": 2}
                        ],
                        "QuestName": "Crystalswine4",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Crystalswine4",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Cryosnake:", "finalV": 20, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 90}
                        ]
                    },
                    "Sunrunning to Chizoar": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The note continues: <br> 'That was cool but not cool enough for another stamp. You can have my token instead if you do this...' <br> QUEST:Defeat every Cryosnake Bop Box and Neyeptune before time runs out.",
                        "NextIndex": 11,
                        "Name": "Sunrunning to Chizoar",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken38", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy3", "quantity": 1},
                            <ComponentModel>{"item": "GemP16", "quantity": 3}
                        ],
                        "QuestName": "Crystalswine5",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Crystalswine5",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Monsters Defeated:", "finalV": 59, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 240}
                        ]
                    },
                    "Global Warming": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The note continues: <br> 'Ok THAT was cool. If you take out all the monsters on every map from here to rams you can have my final stamp.' <br> Quest:Defeat every monster inbetween here and Dedotated Rams.",
                        "NextIndex": 14,
                        "Name": "Global Warming",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 13,
                        "Rewards": [
                            <ComponentModel>{"item": "StampA25", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy5", "quantity": 1},
                            <ComponentModel>{"item": "GemP16", "quantity": 5}
                        ],
                        "QuestName": "Crystalswine6",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Crystalswine6",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Monsters Defeated:", "finalV": 168, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 500}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'The pig looks at you'",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'You step to the side... the pig's eyes dont move because he's frozen. It was just a coincidence that they were looking at you initially.'",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Unless you want a puddle of water and some roasted ham there's not much you can do here.'",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'You notice there's a note stuck between the ice and the ground... the note says:'",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'To whoever reads this I have decided to freeze myself as to avoiding having to actively wait for the next world to be released.'",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'Please don't thaw me out until the next world is out. Thanks.'",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The note continues: <br> 'You can have my Stamps too if you like just prove yourself first.' QUEST:Defeat all the Cryosnakes in this map before time runs out",
                        "NextIndex": 8,
                        "Name": "Melting the Snakes"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "The note has a little disclaimer saying: <br> 'You don't have enough space clear some up'",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'You turn the note around and continue reading...'",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The note continues: <br> 'That was cool but not cool enough for another stamp. You can have my token instead if you do this...' <br> QUEST:Defeat every Cryosnake Bop Box and Neyeptune before time runs out.",
                        "NextIndex": 11,
                        "Name": "Sunrunning to Chizoar"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "The note has a little disclaimer saying: <br> 'You don't have enough space clear some up'",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'You turn the note around and continue reading...'",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The note continues: <br> 'Ok THAT was cool. If you take out all the monsters on every map from here to rams you can have my final stamp.' <br> Quest:Defeat every monster inbetween here and Dedotated Rams.",
                        "NextIndex": 14,
                        "Name": "Global Warming"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "The note has a little disclaimer saying: <br> 'You don't have enough space clear some up'",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'The frozen pig seems happy with you... wait no that's just a smudge on the ice making it look like he's smiling. He is infact unmoved by your actions literally.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Yondergreen", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Signature Slopes",
                    "world": "Frostbite Tundra",
                    "noQuest": 7,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.03,
                    "starSign": "Sagittarius",
                    "mothersMaidenName": "Napier",
                    "notes": "[[Yondergreen]] is found in [[Worlds#Signature Slopes|Signature Slopes]].$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Infrastructure Plan": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "First how do you feel about the importance of infrastructure in the community?? <br> QUEST:Place Shrines in this map.",
                        "NextIndex": 5,
                        "Name": "Infrastructure Plan",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 1}],
                        "QuestName": "Yondergreen1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Yondergreen1",
                        "CustomArray": [<CustomReqModel>{"desc": "Shrines Placed:", "finalV": 4, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Economic Policy": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well I'd need to see your economic policy as well. <br> QUEST:Kill penguins until there are 75 coins on the ground but there CANT be any other types of items on the ground",
                        "NextIndex": 8,
                        "Name": "Economic Policy",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 1}],
                        "QuestName": "Yondergreen2",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "Lowering your droprate to 2x (enough to guarantee coins, but lower chance at items) and reducing your multikill (via Big Brain Time [[Worship#Prayers|Prayer]] can make this slightly easier."
                        },
                        "CustomType": "Yondergreen2",
                        "CustomArray": [<CustomReqModel>{"desc": "Coins on Ground:", "finalV": 75, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Stance on Big Tech": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So how about big tech then? <br> QUEST:Take a printer sample of at least 25 pens",
                        "NextIndex": 11,
                        "Name": "Stance on Big Tech",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 10,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 1}],
                        "QuestName": "Yondergreen3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Yondergreen3",
                        "CustomArray": [<CustomReqModel>{"desc": "Pen Sample Size:", "finalV": 20, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Legislative Action": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Alright as a contract lawyer I have one more question. Do you have the guts to sign legislature into action? <br> QUEST:Collect contracts. They only drop from penguins you kill actively not while you're gone!",
                        "NextIndex": 14,
                        "Name": "Legislative Action",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "Quest60", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 2}],
                        "QuestName": "Yondergreen4",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Quest62", "quantity": 4}]
                    },
                    "No Snapping Contract": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Please go see Snouts he wants his rope to be contractually obligated to not break on him... yea not the smartest pig around. <br> QUEST:Go idle at Stache map for exactly 4 hours 10 minutes. You can be off by only a few minutes.",
                        "NextIndex": 18,
                        "Name": "No Snapping Contract",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 17,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 1}],
                        "QuestName": "Yondergreen5",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": "You can only be off by +/- 3 minutes, so you cannot use candy. Set a timer."},
                        "CustomType": "Yondergreen5",
                        "CustomArray": [<CustomReqModel>{"desc": "Idle with Snouts:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Keep Away Contract": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Lonely Hunter needs a restraining order on... well everyone. I guess it's in the name right? <br> QUEST:Go idle at Flakes map for exactly 9 hours 33 minutes. You can be off by only a few minutes.",
                        "NextIndex": 21,
                        "Name": "Keep Away Contract",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 20,
                        "Rewards": [<ComponentModel>{"item": "Timecandy4", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 2}],
                        "QuestName": "Yondergreen6",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "You can only be off by +/- 3 minutes, so you cannot use candy. Set a timer."},
                        "CustomType": "Yondergreen6",
                        "CustomArray": [<CustomReqModel>{"desc": "Idle with LH:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Ad Solidarity Contract": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Bill Brr wants some stronger advertiser contracts so they can't back out every time he makes an edgy joke. <br> QUEST:Go idle at Bop Boxes map for exactly 21 hours 51 minutes. You can be off by only a few minutes.",
                        "NextIndex": 24,
                        "Name": "Ad Solidarity Contract",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 23,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken36", "quantity": 1}, <ComponentModel>{"item": "Timecandy5", "quantity": 1}],
                        "QuestName": "Yondergreen7",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": "You can only be off by +/- 3 minutes, so you cannot use candy. Set a timer."},
                        "CustomType": "Yondergreen7",
                        "CustomArray": [<CustomReqModel>{"desc": "Idle with Bill:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well hello there!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Are you here about the election? I assumed as much it's that time of the year again after all...",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "So it's a choice between current mayor Hoggi and that Irwin fella eh? Well if you're here on Hoggi's behalf I guess I'll ask you some questions.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "First how do you feel about the importance of infrastructure in the community?? <br> QUEST:Place Shrines in this map.",
                        "NextIndex": 5,
                        "Name": "Infrastructure Plan"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I see you take it very seriously! Good good.",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well I'd need to see your economic policy as well. <br> QUEST:Kill penguins until there are 75 coins on the ground but there CANT be any other types of items on the ground",
                        "NextIndex": 8,
                        "Name": "Economic Policy"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah a balanced economic policy which benefits it's citizens equally! I couldn't agree more.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So how about big tech then? <br> QUEST:Take a printer sample of at least 25 pens",
                        "NextIndex": 11,
                        "Name": "Stance on Big Tech"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You understand its importance and inevitability toward a more prosperious society while not letting it get out of hand. A great approach if I do say so myself!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Alright as a contract lawyer I have one more question. Do you have the guts to sign legislature into action? <br> QUEST:Collect contracts. They only drop from penguins you kill actively not while you're gone!",
                        "NextIndex": 14,
                        "Name": "Legislative Action"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "If Hoggi is surrounding himself with folks like you then he's the one for the job. Take my vote and come on back if you've got time for some law work!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I have a few clients who I've prepared contracts for and I need you to help me with the busywork that comes with a proper contract delivery.",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Please go see Snouts he wants his rope to be contractually obligated to not break on him... yea not the smartest pig around. <br> QUEST:Go idle at Stache map for exactly 4 hours 10 minutes. You can be off by only a few minutes.",
                        "NextIndex": 18,
                        "Name": "No Snapping Contract"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Good work! Lets get to the next client before the ink starts to chip off!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Lonely Hunter needs a restraining order on... well everyone. I guess it's in the name right? <br> QUEST:Go idle at Flakes map for exactly 9 hours 33 minutes. You can be off by only a few minutes.",
                        "NextIndex": 21,
                        "Name": "Keep Away Contract"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Solid work again! One last client to service now.",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Bill Brr wants some stronger advertiser contracts so they can't back out every time he makes an edgy joke. <br> QUEST:Go idle at Bop Boxes map for exactly 21 hours 51 minutes. You can be off by only a few minutes.",
                        "NextIndex": 24,
                        "Name": "Ad Solidarity Contract"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I can see why Hoggi picked you to represent him you're a very versatile and competent person! Thank you for the help and best of luck to you in your future endeavors!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Worldo", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Inside the Igloo",
                    "world": "Frostbite Tundra",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "Unknown",
                    "birthWeight": 3.97,
                    "starSign": "Virgo",
                    "mothersMaidenName": "Rice",
                    "notes": "[[Worldo]] is found in [[Worlds#Inside the Igloo|Inside the Igloo]], accessible from W3 Town. He is also the shopkeeper within Glacial Basement, the third [[Dungeons|Party Dungeon]].$NEWLINE$"
                },
                "quests": {
                    "Odd Jobs for Cold Hard Cash": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Enter the basement through that cave to the left and try to make something of yourself! <br> QUEST:Complete 15 jobs in the Glacial Basement Dungeon. It's the task shown at the top.",
                        "NextIndex": 6,
                        "Name": "Odd Jobs for Cold Hard Cash",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 5,
                        "Rewards": [<ComponentModel>{"item": "CardPack4", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 3}],
                        "QuestName": "Worldo1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Worldo1",
                        "CustomArray": [<CustomReqModel>{"desc": "Jobs Completed:", "finalV": 15, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Can't Guard if you're Dead!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But you gotta stop working for others and take them head one! Fight the power!! <br> QUEST:Defeat 12 Ice Guards in a single run.",
                        "NextIndex": 9,
                        "Name": "Can't Guard if you're Dead!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [<ComponentModel>{"item": "CardPack4", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 4}],
                        "QuestName": "Worldo2",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Worldo2",
                        "CustomArray": [<CustomReqModel>{"desc": "Guards Defeated:", "finalV": 12, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... don't say it. Don't you say it!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'You stare at Worldo blankly without talking since you have no face or mouth.'",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Good good. I was about to go nasty on you if you made a Where's Worldo joke...",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Anyway you best get down there and get to work! Plenty of odd jobs to be done and in today's economy you better work a few of them at once!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Enter the basement through that cave to the left and try to make something of yourself! <br> QUEST:Complete 15 jobs in the Glacial Basement Dungeon. It's the task shown at the top.",
                        "NextIndex": 6,
                        "Name": "Odd Jobs for Cold Hard Cash"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Nice work you've got spirit at least more than most who come face to face with an oppressive economic system like that.",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But you gotta stop working for others and take them head one! Fight the power!! <br> QUEST:Defeat 12 Ice Guards in a single run.",
                        "NextIndex": 9,
                        "Name": "Can't Guard if you're Dead!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have enough inventory space clear some up!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That'll show 'em! <br> Well guess that's all we can do. I mean I'd give you a quest to kill the Big Boss and bring down the system but if any of his goons found out they'd come get me for sure... so yea no more quests.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Shuvelle", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Mamooooth Mountain",
                    "world": "Frostbite Tundra",
                    "noQuest": 7,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 6.48,
                    "starSign": "Leo",
                    "mothersMaidenName": "Chambers",
                    "notes": "[[Shuvelle]] is found in [[Worlds#Mamooooth Mountain|Mamooooth Mountain]].$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "Mayoral Luck": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So first off as my mom always told me luck is the most important thing in this world. So are you lucky? <br> QUEST: Kill Mamooths and get lucky with tusk drops. If you fail you need to FORFEIT the quest in the codex.",
                        "NextIndex": 5,
                        "Name": "Mayoral Luck",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "Timecandy1", "quantity": 2}, <ComponentModel>{"item": "GemP16", "quantity": 1}],
                        "QuestName": "Shuvelle1",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "You can weaken the Mamooths prior to accepting the quest and the timer starting to be able to kill them quicker. "
                        },
                        "CustomType": "Shuvelle1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Tusks Dropped:", "finalV": 6, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Time Left:", "finalV": 1, "type": "GreaterEqual", "startV": 50}
                        ]
                    },
                    "Mayoral Skill": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Of course there's more to leadership than just luck. I'm not sure you've learned the Digging Skill yet but how about Catching? QUEST: Bring some Mosquisnow Bugs to Shuvelle.",
                        "NextIndex": 8,
                        "Name": "Mayoral Skill",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 7,
                        "Rewards": [
                            <ComponentModel>{"item": "GemP16", "quantity": 2},
                            <ComponentModel>{"item": "Bug3", "quantity": 2000},
                            <ComponentModel>{"item": "Fish3", "quantity": 2000}
                        ],
                        "QuestName": "Shuvelle2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Bug5", "quantity": 200}]
                    },
                    "Mayoral Sack Size": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Lucky skillfull... how about resourceful? No no my apologies I meant resource full! <br> QUEST:Have 8000 Mamooth tusks in your inventory at once. She won't take them from you don't worry.",
                        "NextIndex": 11,
                        "Name": "Mayoral Sack Size",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 10,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 1}],
                        "QuestName": "Shuvelle3",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "SnowB2", "quantity": 8000}]
                    },
                    "Mayoral Movie Taste": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Can you get me a DVD of that one movie the 'coming of age' one? I think I saw some mamooths with a copy ages ago... <br> QUEST:Get a DVD from mamooths which is a super rare drop.",
                        "NextIndex": 14,
                        "Name": "Mayoral Movie Taste",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "Quest59", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 1}],
                        "QuestName": "Shuvelle4",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "SnowB2a", "quantity": 1}]
                    },
                    "Diggy Hole!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I've got a client who needs some holes dug in various places... first one is just down there on the top left mamooth platform under the rope. <br> QUEST:Kill mamooths and have shovels drop into the place right under the rope.",
                        "NextIndex": 17,
                        "Name": "Diggy Hole!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 16,
                        "Rewards": [<ComponentModel>{"item": "Timecandy2", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 1}],
                        "QuestName": "Shuvelle5",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Shuvelle5",
                        "CustomArray": [<CustomReqModel>{"desc": "Shovels in Place:", "finalV": 12, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Diggy Diggy Hole!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The second hole is right next door at the Snowman man. Have the shovels drop right above the Worship Totem <br> QUEST:Kill Snowman and have shovels drop into the place right above the Totem.",
                        "NextIndex": 20,
                        "Name": "Diggy Diggy Hole!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 19,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 1}, <ComponentModel>{"item": "GemP16", "quantity": 2}],
                        "QuestName": "Shuvelle6",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Once the shovels are in place, leave them where they are and return to Shuvelle. If you pick them up before leaving the screen, the counter will reset back down to 0 and you must place them again."
                        },
                        "CustomType": "Shuvelle6",
                        "CustomArray": [<CustomReqModel>{"desc": "Shovels in Place:", "finalV": 15, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Dig Diggily Diggy Dig Dig Hole!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The last hole they needed dug is on the edge of the frozen plane somewhere around the Thermisters. QUEST:Kill Thermisters and have shovels drop into the place right near the uh... hmm idk but you'll figure it out!.",
                        "NextIndex": 23,
                        "Name": "Dig Diggily Diggy Dig Dig Hole!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 22,
                        "Rewards": [
                            <ComponentModel>{"item": "NPCtoken35", "quantity": 1},
                            <ComponentModel>{"item": "Timecandy3", "quantity": 1},
                            <ComponentModel>{"item": "GemP16", "quantity": 2}
                        ],
                        "QuestName": "Shuvelle7",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "Make the shovels drop at the rightmost edge of the bottom right spawn platform."
                        },
                        "CustomType": "Shuvelle7",
                        "CustomArray": [<CustomReqModel>{"desc": "Shovels in Place:", "finalV": 16, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Diggy diggy hole I'm digging a hole...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hello. How's your day going? What's that? It's election time again? Whose on the ballot this time is Hoggi still on there?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ah you're his campaign manager? Hmm you're not the same one who came around last time so I need to run some things past you to make sure you still represent my views.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "So first off as my mom always told me luck is the most important thing in this world. So are you lucky? <br> QUEST: Kill Mamooths and get lucky with tusk drops. If you fail you need to FORFEIT the quest in the codex.",
                        "NextIndex": 5,
                        "Name": "Mayoral Luck"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have any inventory space so I can't give you anything!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That sure was lucky! I definitely would feel much better knowing our leader is lucky. I bet the other candidate couldn't even find a single coin from 100 kills!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Of course there's more to leadership than just luck. I'm not sure you've learned the Digging Skill yet but how about Catching? QUEST: Bring some Mosquisnow Bugs to Shuvelle.",
                        "NextIndex": 8,
                        "Name": "Mayoral Skill"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have any inventory space so I can't give you anything!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My my that's an impressive amount of mosquisnow bugs! Here hon why don't you take these resources in return call it a fair trade.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Lucky skillfull... how about resourceful? No no my apologies I meant resource full! <br> QUEST:Have 8000 Mamooth tusks in your inventory at once. She won't take them from you don't worry.",
                        "NextIndex": 11,
                        "Name": "Mayoral Sack Size"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have any inventory space so I can't give you anything!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm so glad to see Hoggi is still out there hiring great personel! But before I register my vote there's one more thing.",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Can you get me a DVD of that one movie the 'coming of age' one? I think I saw some mamooths with a copy ages ago... <br> QUEST:Get a DVD from mamooths which is a super rare drop.",
                        "NextIndex": 14,
                        "Name": "Mayoral Movie Taste"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have any inventory space so I can't give you anything!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well sir you've got yourself a Vote! Well hoggi does... you get what I mean. But if you want to stick around I've got my own work that I could use a hand with since I'm a shovel who has no hands.",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I've got a client who needs some holes dug in various places... first one is just down there on the top left mamooth platform under the rope. <br> QUEST:Kill mamooths and have shovels drop into the place right under the rope.",
                        "NextIndex": 17,
                        "Name": "Diggy Hole!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have any inventory space so I can't give you anything!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great work!",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The second hole is right next door at the Snowman man. Have the shovels drop right above the Worship Totem <br> QUEST:Kill Snowman and have shovels drop into the place right above the Totem.",
                        "NextIndex": 20,
                        "Name": "Diggy Diggy Hole!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have any inventory space so I can't give you anything!",
                        "NextIndex": 18,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Awesome job again!",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The last hole they needed dug is on the edge of the frozen plane somewhere around the Thermisters. QUEST:Kill Thermisters and have shovels drop into the place right near the uh... hmm idk but you'll figure it out!.",
                        "NextIndex": 23,
                        "Name": "Dig Diggily Diggy Dig Dig Hole!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You don't have any inventory space so I can't give you anything!",
                        "NextIndex": 21,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You're a great digger especially for someone who isn't a literal shovel! Well I better get back to digging my own grave here who knows when my handle will splinter!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Lonely Hunter", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Snowfield Outskirts",
                    "world": "Frostbite Tundra",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 7.48,
                    "starSign": "Gemini",
                    "mothersMaidenName": "Ziegler",
                    "notes": "[[Lonely Hunter]] is found in [[Worlds#Snowfield Outskirts|Snowfield Outskirts]], next to [[Colosseum/Chillsnap|Chillsnap Colosseum]].$NEWLINE$$NEWLINE$Completing his quests gives the player the ability to talk to him once every day to obtain a {{CraftReq|Colosseum Ticket}}. He will hold tickets for you for up to 3 days. Having more characters complete his quests does not provide more daily tickets.$NEWLINE$"
                },
                "quests": {
                    "Leaf Him Alone!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go on leave me alone. <br> QUEST:Well you heard him!",
                        "NextIndex": 4,
                        "Name": "Leaf Him Alone!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 5}, <ComponentModel>{"item": "Timecandy1", "quantity": 1}],
                        "QuestName": "Lonely Hunter1",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Leaf1", "quantity": 200}, <ComponentModel>{"item": "Leaf2", "quantity": 50}]
                    },
                    "Skeleton? Skelegone!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I guess my tickets are a small price to pay to get rid of you. Defeat the Skeletons in the Colosseum and they're yours. <br> QUEST:Summon Skeletons by breaking the skull rock in the top right of the colosseum and destroy them!",
                        "NextIndex": 7,
                        "Name": "Skeleton? Skelegone!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "Timecandy1", "quantity": 1}, <ComponentModel>{"item": "TixCol", "quantity": 2}],
                        "QuestName": "Lonely Hunter2",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Lonely Hunter2",
                        "CustomArray": [<CustomReqModel>{"desc": "Xylobones Defeated:", "finalV": 5, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Opening Chests": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ugh hang on. I forgot about the token. Look just break open some chests and you can have it. <br> QUEST:Break open chests in this colosseum.",
                        "NextIndex": 10,
                        "Name": "Opening Chests",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 9,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken31", "quantity": 1}, <ComponentModel>{"item": "TixCol", "quantity": 2}],
                        "QuestName": "Lonely Hunter3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Lonely Hunter3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Bronze Chests:", "finalV": 7, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Silver Chests:", "finalV": 3, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Gold Chests:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ughh...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Was real nice before people started showing up all the time. I'm not like the other colosseum masters my tickets are my own.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go on leave me alone. <br> QUEST:Well you heard him!",
                        "NextIndex": 4,
                        "Name": "Leaf Him Alone!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Inventory empty it.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What the... what are these for? Why did y-- oh. <br> Ugh.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I guess my tickets are a small price to pay to get rid of you. Defeat the Skeletons in the Colosseum and they're yours. <br> QUEST:Summon Skeletons by breaking the skull rock in the top right of the colosseum and destroy them!",
                        "NextIndex": 7,
                        "Name": "Skeleton? Skelegone!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Inventory Empty it",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Alright you got your tickets now get outta here.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ugh hang on. I forgot about the token. Look just break open some chests and you can have it. <br> QUEST:Break open chests in this colosseum.",
                        "NextIndex": 10,
                        "Name": "Opening Chests"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Inventory Empty it",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Alright you got your tickets now get outta here.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Carpenter Cardinal", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Frostbite Towndra",
                    "world": "Frostbite Tundra",
                    "noQuest": 1,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.57,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Uflann",
                    "notes": "[[Carpenter Cardinal]] is found in the top left of Frostbite Towndra, next to the portal to World 4.$NEWLINE$$NEWLINE$Upon completing his quest the player gains access to the portal to World 4 - Hyperion Nebula.$NEWLINE$$NEWLINE$'''Note:''' Unlocking the portal with one character unlocks it for all characters on your account.$NEWLINE$"
                },
                "quests": {
                    "Restoring Power, once again, to a Portal": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "KAWKAWKAWKAW! <br> 'The bird saw in the patch notes that world 4 is finally out and REALLY wants to rebuild the portal to world 4.' <br> QUEST:Retrieve the Galaxial Amethyst from Chizoar the World 3 boss.",
                        "NextIndex": 2,
                        "Name": "Restoring Power, once again, to a Portal",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "Timecandy9", "quantity": 1}, <CoinRewardModel>{"item": "", "quantity": 1500000000}],
                        "QuestName": "Carpenter Cardinal1",
                        "Difficulty": 8,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Crystal3", "quantity": 1}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Kaw KAW! Kaw KAW! 'The bird seems insistent on rebuilding the portal to World 4 as soon as possible'",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "KAWKAWKAWKAW! <br> 'The bird saw in the patch notes that world 4 is finally out and REALLY wants to rebuild the portal to world 4.' <br> QUEST:Retrieve the Galaxial Amethyst from Chizoar the World 3 boss.",
                        "NextIndex": 2,
                        "Name": "Restoring Power, once again, to a Portal"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "KAW! KAWWWWWW!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "KAW! KAWWWWWW! <br> 'The bird looks very proud of itself after successfully restoring the portal.'",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Lord of the Hunt", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Trappers Folly",
                    "world": "Frostbite Tundra",
                    "noQuest": 11,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.64,
                    "starSign": "Leo",
                    "mothersMaidenName": "Aikin",
                    "notes": "[[Lord of the Hunt]] is located in [[Worlds#Trappers Folly|Trappers Folly]], to the left of W3 Town. $NEWLINE$"
                },
                "quests": {
                    "Pelt for the Pelt God": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go get me the materials I need to make a trap <br> QUEST:Collect material from Snelbie Snails and Snakes. Also buy a trap from the Town Shop.",
                        "NextIndex": 5,
                        "Name": "Pelt for the Pelt God",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "TrapBoxSet1", "quantity": 1}, <ComponentModel>{"item": "Timecandy4", "quantity": 2}],
                        "QuestName": "Lord of the Hunt1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [
                            <ComponentModel>{"item": "DesertC4", "quantity": 10},
                            <ComponentModel>{"item": "Jungle2", "quantity": 12},
                            <ComponentModel>{"item": "TrapBoxSet1", "quantity": 1}
                        ]
                    },
                    "Frogecoin to the MOON!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'll activate the Froge Hunting Season for ya. Prove your worth by catching the SHINY froge and I'll activate the next Hunt. <br> QUEST:Go trap Froge Critters found in the SLIME map in Blunder Hills.",
                        "NextIndex": 9,
                        "Name": "Frogecoin to the MOON!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 8,
                        "Rewards": [<ComponentModel>{"item": "ExpBalloon2", "quantity": 5}, <ComponentModel>{"item": "Timecandy3", "quantity": 2}],
                        "QuestName": "Lord of the Hunt2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " Located at Jungle Perimeter inn Blunder Hills"},
                        "ItemReq": [<ComponentModel>{"item": "Critter1", "quantity": 100}, <ComponentModel>{"item": "Critter1A", "quantity": 1}]
                    },
                    "Yet another Cartoon Reference": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I've activated the Crabbo Hunting Season they're probably at the beach. If you couldn't guess I need you to trap me a few before I active the next Hunting Season. QUEST:Go trap Crabbo Critters found by the sea.",
                        "NextIndex": 12,
                        "Name": "Yet another Cartoon Reference",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 11,
                        "Rewards": [<ComponentModel>{"item": "Timecandy3", "quantity": 2}],
                        "QuestName": "Lord of the Hunt3",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " Located at Salty Shores in Yum-Yum Desert"},
                        "ItemReq": [<ComponentModel>{"item": "Critter2", "quantity": 250}, <ComponentModel>{"item": "Critter2A", "quantity": 1}]
                    },
                    "Small Stingers, Big Owie": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Alright the Scorpie Hunting Season is on you know what to do. QUEST:Go trap Scorpie Critters. No hint where they are sorry... I'm still stuck on the Crabbo quest myself!",
                        "NextIndex": 15,
                        "Name": "Small Stingers, Big Owie",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 14,
                        "Rewards": [<ComponentModel>{"item": "ExpBalloon3", "quantity": 2}, <ComponentModel>{"item": "Timecandy3", "quantity": 2}],
                        "QuestName": "Lord of the Hunt4",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " Located at The Ring in Yum-Yum Desert"},
                        "ItemReq": [<ComponentModel>{"item": "Critter3", "quantity": 500}, <ComponentModel>{"item": "Critter3A", "quantity": 2}]
                    },
                    "The Mouse n the Molerat": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Eh it's nothing compared to the sting of being an NPC instead of the main character. Anyway the Mousey Hunting Season is on go do that while I quicksell this scorpie as revenge <br> QUEST:Go trap some Mousey Critters.",
                        "NextIndex": 18,
                        "Name": "The Mouse n the Molerat",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 17,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 10}],
                        "QuestName": "Lord of the Hunt5",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "   Located at Rats Nest in Sewers in Blunder Hills"},
                        "ItemReq": [<ComponentModel>{"item": "Critter4", "quantity": 1000}, <ComponentModel>{"item": "Critter4A", "quantity": 2}]
                    },
                    "Happy Tree Friend": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well I'll count it anyway... I'll activate the Owlio Hunting Season. <br> QUEST:Go trap Owlio Critters.",
                        "NextIndex": 21,
                        "Name": "Happy Tree Friend",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 20,
                        "Rewards": [<ComponentModel>{"item": "Timecandy4", "quantity": 1}],
                        "QuestName": "Lord of the Hunt6",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " Located at Hollowed Trunk in The Giant Tree in blunder Hills"},
                        "ItemReq": [<ComponentModel>{"item": "Critter5", "quantity": 1500}, <ComponentModel>{"item": "Critter5A", "quantity": 3}]
                    },
                    "Noot Noot!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'll activate the Pingy Hunting Season for ya. These little guys are great I still remember when I caught my first Shiny Pingy... <br> QUEST:Go trap some Pingy Critters.",
                        "NextIndex": 24,
                        "Name": "Noot Noot!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 23,
                        "Rewards": [<ComponentModel>{"item": "Timecandy4", "quantity": 1}, <ComponentModel>{"item": "PremiumGem", "quantity": 10}],
                        "QuestName": "Lord of the Hunt7",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": " Located at The Stashe Split in frostbite tundra"},
                        "ItemReq": [<ComponentModel>{"item": "Critter6", "quantity": 2500}, <ComponentModel>{"item": "Critter6A", "quantity": 4}]
                    },
                    "Bunny you Should Say That!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well I'm in too deep to start considering the moral implications of Trapping at this point. The Bunny Hunting Season is up go get em. <br> QUEST:Go trap Bunny Critters.",
                        "NextIndex": 27,
                        "Name": "Bunny you Should Say That!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 26,
                        "Rewards": [<ComponentModel>{"item": "ResetCompletedS", "quantity": 1}],
                        "QuestName": "Lord of the Hunt8",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": " Located at Thermonuclear climb in Frostbite Tundra"},
                        "ItemReq": [<ComponentModel>{"item": "Critter7", "quantity": 4000}, <ComponentModel>{"item": "Critter7A", "quantity": 6}]
                    },
                    "Rollin' Thunder!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "The Dung Beat Hun... haha 'Dung Beat' I just got that... Hunting Season is on. Go for it lad. <br> QUEST:Go trap Dung Beat Critters.",
                        "NextIndex": 30,
                        "Name": "Rollin' Thunder!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 29,
                        "Rewards": [<ComponentModel>{"item": "ResetCompleted", "quantity": 4}],
                        "QuestName": "Lord of the Hunt9",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": " Located at Efaunts tomb, the Boss Room Desert "},
                        "ItemReq": [<ComponentModel>{"item": "Critter8", "quantity": 8000}, <ComponentModel>{"item": "Critter8A", "quantity": 10}]
                    },
                    "Untitled Quest": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Unless I missed some Patch Notes I believe this is the last critter. The Honker Hunting Season is on. HONK! Ahem pardon. <br> QUEST:Go trap Honker Critters.",
                        "NextIndex": 33,
                        "Name": "Untitled Quest",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 32,
                        "Rewards": [<ComponentModel>{"item": "ResetBox", "quantity": 1}, <ComponentModel>{"item": "Timecandy5", "quantity": 1}],
                        "QuestName": "Lord of the Hunt10",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": " Located at Wam Wonderland"},
                        "ItemReq": [<ComponentModel>{"item": "Critter9", "quantity": 65000}, <ComponentModel>{"item": "Critter9A", "quantity": 1}]
                    },
                    "To Trap or not to Trap": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If you can catch more Shinies than I have I'll give you a Trophy! <br> QUEST:Catch a TON of Shinies... like a TOOOOOON.",
                        "NextIndex": 37,
                        "Name": "To Trap or not to Trap",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 36,
                        "Rewards": [<ComponentModel>{"item": "Trophy10", "quantity": 1}],
                        "QuestName": "Lord of the Hunt11",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [
                            <ComponentModel>{"item": "Critter3A", "quantity": 500},
                            <ComponentModel>{"item": "Critter6A", "quantity": 250},
                            <ComponentModel>{"item": "Critter9A", "quantity": 100}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ello... what 'ave we here then?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "A sorry excuse for a trapper if nothing else! Hows about we change that eh?",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Alrighty then look 'ere. If you want to start hunting critters first we gotta go get you a trap then.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Go get me the materials I need to make a trap <br> QUEST:Collect material from Snelbie Snails and Snakes. Also buy a trap from the Town Shop.",
                        "NextIndex": 5,
                        "Name": "Pelt for the Pelt God"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait huh? Howd you get that trap box already?!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well a box is a box what can I say? Equip it now it's a tool just like your pickaxes and fishing rods.",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'll activate the Froge Hunting Season for ya. Prove your worth by catching the SHINY froge and I'll activate the next Hunt. <br> QUEST:Go trap Froge Critters found in the SLIME map in Blunder Hills.",
                        "NextIndex": 9,
                        "Name": "Frogecoin to the MOON!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "No way these are geniune froges?? I better convert these into frogecoins quickly before... darn their value just dropped to 0. <br> Lets get you on to the next critter!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I've activated the Crabbo Hunting Season they're probably at the beach. If you couldn't guess I need you to trap me a few before I active the next Hunting Season. QUEST:Go trap Crabbo Critters found by the sea.",
                        "NextIndex": 12,
                        "Name": "Yet another Cartoon Reference"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aye these will do nice job.",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Alright the Scorpie Hunting Season is on you know what to do. QUEST:Go trap Scorpie Critters. No hint where they are sorry... I'm still stuck on the Crabbo quest myself!",
                        "NextIndex": 15,
                        "Name": "Small Stingers, Big Owie"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 13,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great hand them over. OW! Stupid little     stung me!",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Eh it's nothing compared to the sting of being an NPC instead of the main character. Anyway the Mousey Hunting Season is on go do that while I quicksell this scorpie as revenge <br> QUEST:Go trap some Mousey Critters.",
                        "NextIndex": 18,
                        "Name": "The Mouse n the Molerat"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ew what is this thing? A naked what? How should I know what this is when I was created the Sewers were future content!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well I'll count it anyway... I'll activate the Owlio Hunting Season. <br> QUEST:Go trap Owlio Critters.",
                        "NextIndex": 21,
                        "Name": "Happy Tree Friend"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 19,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Finally I thought you'd never get finished with that one!",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "I'll activate the Pingy Hunting Season for ya. These little guys are great I still remember when I caught my first Shiny Pingy... <br> QUEST:Go trap some Pingy Critters.",
                        "NextIndex": 24,
                        "Name": "Noot Noot!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 22,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great thats twenty five thousand less pingys for those poachers to get their hands on! Wait we're the poachers huh.",
                        "NextIndex": 25,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Well I'm in too deep to start considering the moral implications of Trapping at this point. The Bunny Hunting Season is up go get em. <br> QUEST:Go trap Bunny Critters.",
                        "NextIndex": 27,
                        "Name": "Bunny you Should Say That!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 25,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You really didn't have to go trap that many. You could've just trapped 2 and then... well never mind.",
                        "NextIndex": 28,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "The Dung Beat Hun... haha 'Dung Beat' I just got that... Hunting Season is on. Go for it lad. <br> QUEST:Go trap Dung Beat Critters.",
                        "NextIndex": 30,
                        "Name": "Rollin' Thunder!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 28,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Great hand them over. OW! <br> What the?!? How'd that Scorpie from earlier get back here!? Ugh...",
                        "NextIndex": 31,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Unless I missed some Patch Notes I believe this is the last critter. The Honker Hunting Season is on. HONK! Ahem pardon. <br> QUEST:Go trap Honker Critters.",
                        "NextIndex": 33,
                        "Name": "Untitled Quest"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 31,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hah you've really gone and done it all haven't you! Well there's no more critters in the universe sadly -- trust me I'd know I'd have caught them if there were!",
                        "NextIndex": 34,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "But I can't just let a prodigy like you leave the Trapping game! How about a challenge eh?",
                        "NextIndex": 35,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "If you can catch more Shinies than I have I'll give you a Trophy! <br> QUEST:Catch a TON of Shinies... like a TOOOOOON.",
                        "NextIndex": 37,
                        "Name": "To Trap or not to Trap"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You need more space although not in that hollow head of yours thats for sure!",
                        "NextIndex": 35,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Huh. I guess that makes YOU the Lord of the Hunt... Well we can't be having a plot hole like this no sir! Enjoy the trophy but I'm going to go sell all this evidence to the store.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Snouts", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "The Stache Split",
                    "world": "Frostbite Tundra",
                    "noQuest": 4,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.93,
                    "starSign": "Libra",
                    "mothersMaidenName": "Vanderpoel",
                    "notes": "[[Snouts]] is hanging around in [[Worlds#The Stache Split|The Stache Split]].$NEWLINE$$NEWLINE$Like other piggy NPCs, his quests award stamps.$NEWLINE$$NEWLINE$"
                },
                "quests": {
                    "A Salty Fall": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hmm... that snow has rocks in it that's no good. Can you go get me something to land on? <br> QUEST:Get some Refinery Salts to make into a pile for Snouts to fall onto.",
                        "NextIndex": 7,
                        "Name": "A Salty Fall",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "StampA21", "quantity": 1}],
                        "QuestName": "Snouts1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Refinery1", "quantity": 30}]
                    },
                    "Gravity VS Salt": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Do you have anything else I could land on? <br> QUEST:Get some Orange Refinery Salts hopefully they wont react with the snow.",
                        "NextIndex": 10,
                        "Name": "Gravity VS Salt",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 9,
                        "Rewards": [<ComponentModel>{"item": "StampA18", "quantity": 1}, <ComponentModel>{"item": "StampB26", "quantity": 1}],
                        "QuestName": "Snouts2",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Refinery2", "quantity": 50}]
                    },
                    "Big Ol Chonker": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Apparently theres a Prayer that summons GIANT monsters. Maybe if you manage to kill one on this map you can push its body under me as a cushion! <br> QUEST:Defeat a giant monster. You need a Prayer for giants to spawn at all remember.",
                        "NextIndex": 14,
                        "Name": "Big Ol Chonker",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "StampC15", "quantity": 1}, <ComponentModel>{"item": "StampC20", "quantity": 1}],
                        "QuestName": "Snouts3",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "You must equip the [[Worship#Tachion_of_the_Titans|Tachion of the Titans]] Prayer to spawn Giant Monsters."
                        },
                        "CustomType": "Snouts3",
                        "CustomArray": [<CustomReqModel>{
                            "desc": "Defeat Giant Stache Mob:",
                            "finalV": 1,
                            "type": "GreaterEqual",
                            "startV": 0
                        }]
                    },
                    "Mana Plox": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "WAIT! I totally forgot I have a star talent that can shield me!! But I don't have enough mana to cast it... please get me some pots!!! <br> QUEST:Get the big circular mana potions for Snouts!",
                        "NextIndex": 18,
                        "Name": "Mana Plox",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 17,
                        "Rewards": [<ComponentModel>{"item": "NPCtoken34", "quantity": 1}, <ComponentModel>{"item": "Timecandy3", "quantity": 1}],
                        "QuestName": "Snouts4",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "FoodPotMana3", "quantity": 250}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm stuck...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Wait maybe if I swing THIS way... nope.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "But what if I swing THAT way...? 'sad oink noise'.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm stuck... oh hey!! Hey you!! Can you help me?",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "My survival guide said if I ever got stuck on a rope the FIRST thing I should do is see if I can just let go and fall on something soft!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Hmm... that snow has rocks in it that's no good. Can you go get me something to land on? <br> QUEST:Get some Refinery Salts to make into a pile for Snouts to fall onto.",
                        "NextIndex": 7,
                        "Name": "A Salty Fall"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Your inventory is full!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh no!!! The salts evaporating! It must be reacting with the snow or something ^",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Do you have anything else I could land on? <br> QUEST:Get some Orange Refinery Salts hopefully they wont react with the snow.",
                        "NextIndex": 10,
                        "Name": "Gravity VS Salt"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Your inventory is full!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "AAAH!!! WHAT SALT WAS THAT? IT JUST EXPLODED!!! Are... are you ok? Youre just sleeping right?",
                        "NextIndex": 11,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Well I'm out of ideas... <br> ... <br> ... <br> Unless... no theres no way the rumors are true.",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Apparently theres a Prayer that summons GIANT monsters. Maybe if you manage to kill one on this map you can push its body under me as a cushion! <br> QUEST:Defeat a giant monster. You need a Prayer for giants to spawn at all remember.",
                        "NextIndex": 14,
                        "Name": "Big Ol Chonker"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Your inventory is full!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "What the..? It disappeared!! It just up and vanished a few seconds after it died! Where did it even go? Welp guess that means just one thing...",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I'm stuck...",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "WAIT! I totally forgot I have a star talent that can shield me!! But I don't have enough mana to cast it... please get me some pots!!! <br> QUEST:Get the big circular mana potions for Snouts!",
                        "NextIndex": 18,
                        "Name": "Mana Plox"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Your inventory is full!",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Oh right mana potions don't actually give you mana they just make it recharge faster... guess I'll have to wait!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Coastiolyte", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Yes",
                    "type": "Event",
                    "birthWeight": 6.99,
                    "starSign": "Unknown",
                    "mothersMaidenName": "",
                    "notes": "'''Cmon bro go get yourself some of that summer action!! I wanna see you opening those coolers like no other!'''$NEWLINE$$NEWLINE$The [[Coastiolyte]] is a blobulyte available during the [[Events#Summer Break|Summer Break Event]] (June 26th 2021 until July 18th 2021). Its daily quests award players {{CraftReq|Summer Cooler}} and {{CraftReq|Beach Oyster}} in exchange for finding {{CraftReq|Summer Cooler}} or killing [[Plasti Doug]] and [[Mr Blueberry]].$NEWLINE$"
                },
                "quests": {
                    "Cooler than a Cooler!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Cmon bro go get yourself some of that summer action!! I wanna see you opening those coolers like no other! <br> QUEST:Crack open some Coolers with the lads!",
                        "NextIndex": 4,
                        "Name": "Cooler than a Cooler!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "Quest49", "quantity": 20}, <ComponentModel>{"item": "Quest50", "quantity": 10}],
                        "QuestName": "Coastiolyte1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Coastiolyte1",
                        "CustomArray": [<CustomReqModel>{"desc": "Open Summer Coolers:", "finalV": 12, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Vibe Check": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But dang there sure are a lot of newbies harshin' the vibe this year... can you get rid of them? <br> QUEST: Clear the beach of all these 'Out of Towner' monsters",
                        "NextIndex": 7,
                        "Name": "Vibe Check",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "Quest49", "quantity": 30}, <ComponentModel>{"item": "Quest50", "quantity": 10}],
                        "QuestName": "Coastiolyte2",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Coastiolyte2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Defeat Plasti Dougs:", "finalV": 12, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Defeat Mr. Blueberrys:", "finalV": 5, "type": "GreaterEqual", "startV": 0}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yoooo summer break bro! Whats up!!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Three weeks of hangin' around and getting sick-as rewards! This is the LIFE!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Cmon bro go get yourself some of that summer action!! I wanna see you opening those coolers like no other! <br> QUEST:Crack open some Coolers with the lads!",
                        "NextIndex": 4,
                        "Name": "Cooler than a Cooler!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory bro! Make some space!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Man leave some coolers for the rest of us haha! Thats was totally tops dude.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "But dang there sure are a lot of newbies harshin' the vibe this year... can you get rid of them? <br> QUEST: Clear the beach of all these 'Out of Towner' monsters",
                        "NextIndex": 7,
                        "Name": "Vibe Check"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory bro! Make some space!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yooo now its a party! <br> Pfft cmon don't be down about it bro it's Summer Break! We don't worry about the underlying morals and themes behind quests around here we just have fun!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Walupiggy", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Secret",
                    "world": "Yum Yum Desert",
                    "noQuest": 4,
                    "repeatable": "Unknonwn",
                    "type": "",
                    "birthWeight": 1.74,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Ingram",
                    "notes": "See the [https://www.youtube.com/playlist?list=PLBG_WXgv7iS7UtkCmTxAL_-nH8V4ldufF Legends of Idleon Youtube Channel] for more details.$NEWLINE$"
                },
                "quests": {
                    "Treasure Hunt 1": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 1st Treasure Hunt! You need to go to the Legends of IdleOn youtube channel to find the clues to follow to complete this!",
                        "NextIndex": 3,
                        "Name": "Treasure Hunt 1",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "Timecandy4", "quantity": 2}, <ComponentModel>{"item": "Pearl4", "quantity": 5}],
                        "QuestName": "Walupiggy1",
                        "Difficulty": 2,
                        "note": <NoteModel>{"note": "[https://www.youtube.com/watch?v=9XXmfvCs9FY Treasure Hunt #1 Video]"},
                        "CustomType": "Walupiggy1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Steps Completed:", "finalV": 6, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Treasure Dug up:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Treasure Hunt 2": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 2nd Treasure Hunt! Clues are at the Legends of Idleon youtube channel remember!",
                        "NextIndex": 6,
                        "Name": "Treasure Hunt 2",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 5,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy5", "quantity": 2},
                            <ComponentModel>{"item": "TalentPoint6", "quantity": 4},
                            <ComponentModel>{"item": "TalentPoint3", "quantity": 3}
                        ],
                        "QuestName": "Walupiggy2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": "[https://www.youtube.com/watch?v=R0xTfo3YedQ Treasure Hunt #2 Video]"},
                        "CustomType": "Walupiggy2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Steps Completed:", "finalV": 7, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Treasure Dug up:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Treasure Hunt 3": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 3rd Treasure Hunt! Clues are on the Legends of Idleon youtube channel!",
                        "NextIndex": 9,
                        "Name": "Treasure Hunt 3",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 8,
                        "Rewards": [
                            <ComponentModel>{"item": "StoneHelm6", "quantity": 6},
                            <ComponentModel>{"item": "Pearl4", "quantity": 8},
                            <ComponentModel>{"item": "TalentPoint2", "quantity": 3}
                        ],
                        "QuestName": "Walupiggy3",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": "[https://youtu.be/WYCo9kiJxug Treasure Hunt #3 Video]"},
                        "CustomType": "Walupiggy3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Steps Completed:", "finalV": 8, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Treasure Dug up:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Treasure Hunt 4": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 4th Treasure Hunt! Clues are on the Legends of Idleon youtube channel!",
                        "NextIndex": 12,
                        "Name": "Treasure Hunt 4",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 11,
                        "Rewards": [
                            <ComponentModel>{"item": "Timecandy7", "quantity": 5},
                            <ComponentModel>{"item": "Quest44", "quantity": 12},
                            <ComponentModel>{"item": "CardPack1", "quantity": 1}
                        ],
                        "QuestName": "Walupiggy4",
                        "Difficulty": 5,
                        "note": <NoteModel>{
                            "note": "[https://www.youtube.com/watch?v=33k5wVGUyII Treasure Hunt #4 Video] Goldegg Capsules are no longer usable in game."
                        },
                        "CustomType": "Walupiggy4",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Steps Completed:", "finalV": 8, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Treasure Dug up:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WAAAH!!!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 1st Treasure Hunt! You need to go to the Legends of IdleOn youtube channel to find the clues to follow to complete this!",
                        "NextIndex": 3,
                        "Name": "Treasure Hunt 1"
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "WAH?", "NextIndex": 1, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WAOOO!! WAHA!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 2nd Treasure Hunt! Clues are at the Legends of Idleon youtube channel remember!",
                        "NextIndex": 6,
                        "Name": "Treasure Hunt 2"
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "WAH?", "NextIndex": 4, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WAOOO!! YEHEHEHE!!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 3rd Treasure Hunt! Clues are on the Legends of Idleon youtube channel!",
                        "NextIndex": 9,
                        "Name": "Treasure Hunt 3"
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "WAH?", "NextIndex": 7, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WAOOO!! YEHEHEHE!!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "WAHAHAHAHA! <br> QUEST:Complete the 4th Treasure Hunt! Clues are on the Legends of Idleon youtube channel!",
                        "NextIndex": 12,
                        "Name": "Treasure Hunt 4"
                    },
                    <DialogueLineModel>{"Type": QuestTypeEnum.NoQuest, "DialogueText": "WAH?", "NextIndex": 10, "Name": ""},
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "WAOOO!! YEHEHEHE!!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Toadstall", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Grandfrog's Backyard",
                    "world": "Blunder Hills",
                    "noQuest": 2,
                    "repeatable": "Unknonwn",
                    "type": "",
                    "birthWeight": 6.71,
                    "starSign": "Sagittarius",
                    "mothersMaidenName": "Soukup",
                    "notes": "[[Toadstall]] is found in [[Worlds#Grandfrog's Backyard|Grandfrog's Backyard]], accessible from the bottom left of the [[Frog]] map. He introduces the player to the Party mechanic and is also the shopkeeper within Grandfrog's Gazebo, the first [[Dungeons|Party Dungeon]].$NEWLINE$"
                },
                "quests": {
                    "Creating a Party!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "First create a party! Open your inventory and press the red button up top! Then to invite someone else double click on them and press the red party button in the popup! Badabing it's party time! <br> QUEST:Do as the toad says.",
                        "NextIndex": 6,
                        "Name": "Creating a Party!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 5,
                        "Rewards": [<ComponentModel>{"item": "DungCredits1", "quantity": 10}],
                        "QuestName": "Toadstall1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": "The interface to create a party doesn't appear until you reach level 11."},
                        "CustomType": "Toadstall1",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Create a Party:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Invite someone:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Bigger Party Better Party!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Why don't you invite a few more people to your party? Or join someone elses party! <br> QUEST:Be in a party of 3. You can request to join someone elses party by doing what you do to invite while not being in a party yourself!",
                        "NextIndex": 9,
                        "Name": "Bigger Party Better Party!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 8,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 2}, <ComponentModel>{"item": "DungCredits1", "quantity": 15}],
                        "QuestName": "Toadstall2",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Toadstall2",
                        "CustomArray": [<CustomReqModel>{"desc": "Be in Party of 3:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Bother the Frogger!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ignore the trespassing signs the frog that lives there is just cranky... but a nice soup meal will cheer him up! <br> QUEST:Go 'serve' Grandfrogger some Soup...",
                        "NextIndex": 12,
                        "Name": "Bother the Frogger!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 11,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 2}, <ComponentModel>{"item": "DungCredits1", "quantity": 20}],
                        "QuestName": "Toadstall3",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Toadstall3",
                        "CustomArray": [<CustomReqModel>{"desc": "Defeat Grandfrogger:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Mmmm... I sense a willing spirit approaching!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "'The frog farts'",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "... and there it goes! <br> Oh hello! I was expecting you hence the great timing of my fart joke!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You sure are focused on that Party Dungeon door but have some patience! You must learn a few things before entering.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "First create a party! Open your inventory and press the red button up top! Then to invite someone else double click on them and press the red party button in the popup! Badabing it's party time! <br> QUEST:Do as the toad says.",
                        "NextIndex": 6,
                        "Name": "Creating a Party!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Mmm... you did well but your inventory is full! Clear some space so I can credit you!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Mmm... you did well yes! But that dungeon will slap you silly with how small a party you have!",
                        "NextIndex": 7,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Why don't you invite a few more people to your party? Or join someone elses party! <br> QUEST:Be in a party of 3. You can request to join someone elses party by doing what you do to invite while not being in a party yourself!",
                        "NextIndex": 9,
                        "Name": "Bigger Party Better Party!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Mmm... you did well but your inventory is full! Clear some space so I can credit you!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ehehehe now that's a groovy party! Now then why don't you head on over through that door!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ignore the trespassing signs the frog that lives there is just cranky... but a nice soup meal will cheer him up! <br> QUEST:Go 'serve' Grandfrogger some Soup...",
                        "NextIndex": 12,
                        "Name": "Bother the Frogger!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Mmm... you did well but your inventory is full! Clear some space so I can credit you!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hehe... that outta teach that old coot to not hit me off my walking stick! Please do keep bothering him from time to time he has it coming!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Gangster Gus", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Heaty Hole",
                    "world": "Yum-Yum Desert",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.49,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Darnell",
                    "notes": "[[Gangster Gus]] is found in [[Worlds#Heaty Hole|Heaty Hole]], accessible from the bottom of the [[Mimic]] map. He is also the shopkeeper within Crypt of Snakenhotep, the second [[Dungeons|Party Dungeon]].$NEWLINE$"
                },
                "quests": {
                    "Plunderin Down Yonder": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ya see that there crypt down yonder? Got mad loot in there but I don't have a walking animation so I'm stuck here... go get me somma that good stuff yea? <br> QUEST:Play through Snakenhotep's dungeon!",
                        "NextIndex": 4,
                        "Name": "Plunderin Down Yonder",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 2}, <ComponentModel>{"item": "DungCredits1", "quantity": 15}],
                        "QuestName": "Gangster Gus1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gangster Gus1",
                        "CustomArray": [<CustomReqModel>{"desc": "Dungeon Attempted:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Perfect Progress Score": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "If you get 100% Progress by passing them rooms you'll awaken the boss... and you KNOW he finna have that loot on 'im! <br> QUEST:Defeat Snakenhotep who will come out of hiding if you get 100% Progress.",
                        "NextIndex": 7,
                        "Name": "Perfect Progress Score",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 3}, <ComponentModel>{"item": "DungCredits1", "quantity": 25}],
                        "QuestName": "Gangster Gus2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gangster Gus2",
                        "CustomArray": [<CustomReqModel>{"desc": "Defeat Snakenhotep:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Sanke Revival Denial": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Nah man I ain't gon let this slide. You go on in there and defeat that big bad for real! <br> QUEST: Defeat Enraged Snakenhotep. I'll give you a hint... those skull rocks must be destroyed at all costs!",
                        "NextIndex": 12,
                        "Name": "Sanke Revival Denial",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 11,
                        "Rewards": [<ComponentModel>{"item": "GemP16", "quantity": 3}, <ComponentModel>{"item": "DungCredits1", "quantity": 25}],
                        "QuestName": "Gangster Gus3",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gangster Gus3",
                        "CustomArray": [<CustomReqModel>{"desc": "Defeat Snakenhotep 2:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Eyo my man step away or I'll light you up with this here cannon.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Look... since you here how bout you help out yea? 'stead of just standin' there.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ya see that there crypt down yonder? Got mad loot in there but I don't have a walking animation so I'm stuck here... go get me somma that good stuff yea? <br> QUEST:Play through Snakenhotep's dungeon!",
                        "NextIndex": 4,
                        "Name": "Plunderin Down Yonder"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aw man there we gooo! ... bruh empty your pockets ain't got no space for me to give you nothin!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ayo that's some good stuff you got but I know theres more down there...",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "If you get 100% Progress by passing them rooms you'll awaken the boss... and you KNOW he finna have that loot on 'im! <br> QUEST:Defeat Snakenhotep who will come out of hiding if you get 100% Progress.",
                        "NextIndex": 7,
                        "Name": "Perfect Progress Score"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aw man there we gooo! ... bruh empty your pockets ain't got no space for me to give you nothin!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ya got rid of 'im? They had it comin always sneerin' at me and tellin' me want to do.",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hold up... why are peeps still goin' in there? <br> 'Gus walks over and starts a dungeon run then comes storming back...'",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "YO WHAT U TRYNA PULL BRO? That snake jerk is still alive and kickin' in there go see for yourself!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Nah man I ain't gon let this slide. You go on in there and defeat that big bad for real! <br> QUEST: Defeat Enraged Snakenhotep. I'll give you a hint... those skull rocks must be destroyed at all costs!",
                        "NextIndex": 12,
                        "Name": "Sanke Revival Denial"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Aw man there we gooo! ... bruh empty your pockets ain't got no space for me to give you nothin!",
                        "NextIndex": 10,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Ya got rid of 'im? They had it comin always sneerin' at me and tellin' me want to do.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Falloween Pumpkin", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Blunder Hills",
                    "world": "Blunder Hills",
                    "noQuest": 5,
                    "repeatable": "Unknown",
                    "type": "Event",
                    "birthWeight": 4.14,
                    "starSign": "Pisces",
                    "mothersMaidenName": "Wagner",
                    "notes": "''A jackolantern in November bet you weren't expecting that!''$NEWLINE$$NEWLINE$The [[Falloween Pumpkin]] was an NPC available during the [[Events|Falloween]] Mini-Event (November 1, 2021 - November 15, 2021). Its questline awarded players with {{CraftReq|Gem}}s and {{CraftReq|Spooky Time Candy}}.$NEWLINE$"
                },
                "quests": {
                    "The Spookyness": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Falloween is meant to be scary and what's scarier than death right? Go kill some monsters! <br> QUEST:Defeat monsters without having AUTO turned on.",
                        "NextIndex": 5,
                        "Name": "The Spookyness",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 40}, <ComponentModel>{"item": "Timecandy8", "quantity": 4}],
                        "QuestName": "Falloween Pumpkin1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Falloween Pumpkin1",
                        "CustomArray": [<CustomReqModel>{"desc": "Defeat monsters:", "finalV": 50, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Scaryness": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hmm that may have scared the monsters but you seem unfazed... how about you go play a party dungeon? I heard those things are a true nightmare! <br> QUEST:Play a party dungeon with a party of 4 or more people.",
                        "NextIndex": 8,
                        "Name": "The Scaryness",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 50}, <ComponentModel>{"item": "Timecandy8", "quantity": 5}],
                        "QuestName": "Falloween Pumpkin2",
                        "Difficulty": 3,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Falloween Pumpkin2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Play a Party Dungeon:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{
                                "desc": "Have 4 people in Party:",
                                "finalV": 1,
                                "type": "GreaterEqual",
                                "startV": 0
                            }
                        ]
                    },
                    "The Horroriness": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hmm still not scared eh? Well let's see if you can stomach the sheer terror of a RECYCLED QUEST! <br> QUEST:Defeat monsters without having AUTO turned on.",
                        "NextIndex": 11,
                        "Name": "The Horroriness",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 10,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 50}, <ComponentModel>{"item": "Timecandy8", "quantity": 5}],
                        "QuestName": "Falloween Pumpkin3",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Falloween Pumpkin3",
                        "CustomArray": [<CustomReqModel>{"desc": "Defeat Monsters:", "finalV": 300, "type": "GreaterEqual", "startV": 0}]
                    },
                    "The Booeyness": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ok ok you've got nerves of steel. Let's get back to scaring others then! <br> QUEST:Say 'boo' to 200 different people without closing the Game. If you do your counter will reset.",
                        "NextIndex": 14,
                        "Name": "The Booeyness",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 60}, <ComponentModel>{"item": "Timecandy8", "quantity": 6}],
                        "QuestName": "Falloween Pumpkin4",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Falloween Pumpkin4",
                        "CustomArray": [<CustomReqModel>{
                            "desc": "Say 'Boo' to People:",
                            "finalV": 200,
                            "type": "GreaterEqual",
                            "startV": 0
                        }]
                    },
                    "The Afterparty": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well I've got one last trick for ya... and what a trick it is! After all what's scarier than having to socialize with others?? <br> QUEST: Defeat monsters with other party members around you.",
                        "NextIndex": 17,
                        "Name": "The Afterparty",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 16,
                        "Rewards": [<ComponentModel>{"item": "PremiumGem", "quantity": 80}, <ComponentModel>{"item": "Timecandy8", "quantity": 6}],
                        "QuestName": "Falloween Pumpkin5",
                        "Difficulty": 7,
                        "note": <NoteModel>{"note": "The event ended without this quest being completable."},
                        "CustomType": "Falloween Pumpkin5",
                        "CustomArray": [<CustomReqModel>{
                            "desc": "Defeat mobs in Party:",
                            "finalV": 500,
                            "type": "GreaterEqual",
                            "startV": 0
                        }]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Eee hehehehe!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "A jackolantern in November bet you weren't expecting that! Probably scared you right out of your chair or toilet for you phone users.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Falloween isn't actually an officially celebrated Idleon holiday but I figured hey what could be more terrifying than going against tradition? People really lose their marbles whenever you do that!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Falloween is meant to be scary and what's scarier than death right? Go kill some monsters! <br> QUEST:Defeat monsters without having AUTO turned on.",
                        "NextIndex": 5,
                        "Name": "The Spookyness"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Talk about a scary predicament! Clear that up so I can treat you!",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hehehe perfect! I can already see the other NPC's giving you weird looks for taking part in Falloween oh how splendid!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hmm that may have scared the monsters but you seem unfazed... how about you go play a party dungeon? I heard those things are a true nightmare! <br> QUEST:Play a party dungeon with a party of 4 or more people.",
                        "NextIndex": 8,
                        "Name": "The Scaryness"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Talk about a scary predicament! Clear that up so I can treat you!",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hehehe perfect! I can already see the other NPC's giving you weird looks for taking part in Falloween oh how splendid!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Hmm still not scared eh? Well let's see if you can stomach the sheer terror of a RECYCLED QUEST! <br> QUEST:Defeat monsters without having AUTO turned on.",
                        "NextIndex": 11,
                        "Name": "The Horroriness"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Talk about a scary predicament! Clear that up so I can treat you!",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hehehe perfect! I can already see the other NPC's giving you weird looks for taking part in Falloween oh how splendid!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Ok ok you've got nerves of steel. Let's get back to scaring others then! <br> QUEST:Say 'boo' to 200 different people without closing the Game. If you do your counter will reset.",
                        "NextIndex": 14,
                        "Name": "The Booeyness"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Talk about a scary predicament! Clear that up so I can treat you!",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Hehehe perfect! I can already see the other NPC's giving you weird looks for taking part in Falloween oh how splendid!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well I've got one last trick for ya... and what a trick it is! After all what's scarier than having to socialize with others?? <br> QUEST: Defeat monsters with other party members around you.",
                        "NextIndex": 17,
                        "Name": "The Afterparty"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Talk about a scary predicament! Clear that up so I can treat you!",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Happy Falloween! I'll scare you good next time so ya better watch out!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Blobbo", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Cocoa Tunnel",
                    "world": "Hyperion Nebula",
                    "noQuest": 2,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 2.28,
                    "starSign": "Pisces",
                    "mothersMaidenName": "Resnickn}}n",
                    "notes": ""
                },
                "quests": {
                    "A Honker Took mah Baby!": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Blububblblbluubl! <br> QUEST:My Blobinese is a bit rusty but I think she's saying her children went running after some Honker Critters and have been missing ever since. Maybe get some honkers and they'll come back?",
                        "NextIndex": 3,
                        "Name": "A Honker Took mah Baby!",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 2,
                        "Rewards": [<ComponentModel>{"item": "Ladle", "quantity": 48}, <ComponentModel>{"item": "PetEgg", "quantity": 10}],
                        "QuestName": "Blobbo1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [<ComponentModel>{"item": "Critter9", "quantity": 10000}]
                    },
                    "Glitter Critter": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "BLU! BLU! Blubulelblbublbublble!! <br> QUEST:Ah I see she actually said her children love shiny things and chased after some shiny critters. Bring as many shiny critters as you can I'm sure they'll come flopping back!",
                        "NextIndex": 6,
                        "Name": "Glitter Critter",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 5,
                        "Rewards": [<ComponentModel>{"item": "Ladle", "quantity": 48}, <ComponentModel>{"item": "PetEgg", "quantity": 15}],
                        "QuestName": "Blobbo2",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [
                            <ComponentModel>{"item": "Critter8A", "quantity": 30},
                            <ComponentModel>{"item": "Critter6A", "quantity": 60},
                            <ComponentModel>{"item": "Critter3A", "quantity": 200}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Blublbublbub.... BLUBLBUBLB!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Blububblblbluubl! <br> QUEST:My Blobinese is a bit rusty but I think she's saying her children went running after some Honker Critters and have been missing ever since. Maybe get some honkers and they'll come back?",
                        "NextIndex": 3,
                        "Name": "A Honker Took mah Baby!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "BLULL BLUBINBLUBBERY!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Blububublbulbublobbblb...!!!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "BLU! BLU! Blubulelblbublbublble!! <br> QUEST:Ah I see she actually said her children love shiny things and chased after some shiny critters. Bring as many shiny critters as you can I'm sure they'll come flopping back!",
                        "NextIndex": 6,
                        "Name": "Glitter Critter"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "BLULL BLUBINBLUBBERY!",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Blunb Blu ###",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Capital P", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Jelly Cube Bridge",
                    "world": "Hyperion Nebula",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 5.74,
                    "starSign": "Taurus",
                    "mothersMaidenName": "Lewisn}}n",
                    "notes": ""
                },
                "quests": {
                    "Right side wrong side!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The first game is 'Right Side Wrong Side'. You get 1 Party Point for every monster on the left side of the platform and -5 Point for every monster on the right. This happens every second! <br> QUEST:Win the 1st party game!",
                        "NextIndex": 4,
                        "Name": "Right side wrong side!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 3,
                        "Rewards": [<ComponentModel>{"item": "StampB42", "quantity": 1}, <ComponentModel>{"item": "Ladle", "quantity": 1}],
                        "QuestName": "Capital P1",
                        "Difficulty": 3,
                        "note": <NoteModel>{
                            "note": "You can use Capital P as a marker for the middle of the platform. Only kill monsters to the right of the NPC, leave the monsters on the left alive."
                        },
                        "CustomType": "Capital P1",
                        "CustomArray": [<CustomReqModel>{"desc": "Party Points:", "finalV": 200, "type": "GreaterEqual", "startV": 0}]
                    },
                    "No room on the Dance Floor!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The 2nd game is 'No Room on the Dancefloor'. If all monsters are dead you get 25 points. If even a single monster is alive you lose 5 points. This happens every second! QUEST:Win the 2nd party game!",
                        "NextIndex": 7,
                        "Name": "No room on the Dance Floor!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 6,
                        "Rewards": [<ComponentModel>{"item": "StampC21", "quantity": 1}, <ComponentModel>{"item": "Ladle", "quantity": 1}],
                        "QuestName": "Capital P2",
                        "Difficulty": 4,
                        "note": <NoteModel>{
                            "note": "Removing additional sources of respawn such as equipment or Star Signs can give you more time between spawns."
                        },
                        "CustomType": "Capital P2",
                        "CustomArray": [<CustomReqModel>{"desc": "Party Points:", "finalV": 1400, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Everybody move it move it!": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The 3rd game is 'Move It Move It'. You get some Party Points when you kill a moving monster but LOSE points if you kill a monster that is NOT moving! <br> QUEST:Win the 3rd party game!",
                        "NextIndex": 10,
                        "Name": "Everybody move it move it!",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 9,
                        "Rewards": [<ComponentModel>{"item": "StampA30", "quantity": 1}, <ComponentModel>{"item": "Ladle", "quantity": 1}],
                        "QuestName": "Capital P3",
                        "Difficulty": 6,
                        "note": <NoteModel>{"note": ""},
                        "CustomType": "Capital P3",
                        "CustomArray": [<CustomReqModel>{"desc": "Party Points:", "finalV": 10000, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "It's ya boi!!! Capital P's in the buildin' hide yo drinks cuz I be sippin'... on water that is yall better be hydratin'!",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Sick stuff I just spat eh? I'll be here all night don't worry! I'm the life of the party always have been always will be. <br> Enough talk let's have some fun!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The first game is 'Right Side Wrong Side'. You get 1 Party Point for every monster on the left side of the platform and -5 Point for every monster on the right. This happens every second! <br> QUEST:Win the 1st party game!",
                        "NextIndex": 4,
                        "Name": "Right side wrong side!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Full stop!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Holla holla! You won! Let's keep playing I've got more party games!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The 2nd game is 'No Room on the Dancefloor'. If all monsters are dead you get 25 points. If even a single monster is alive you lose 5 points. This happens every second! QUEST:Win the 2nd party game!",
                        "NextIndex": 7,
                        "Name": "No room on the Dance Floor!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Full stop!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Holla holla! You won AGAIN! Let's keep playing I've got more party games!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "The 3rd game is 'Move It Move It'. You get some Party Points when you kill a moving monster but LOSE points if you kill a monster that is NOT moving! <br> QUEST:Win the 3rd party game!",
                        "NextIndex": 10,
                        "Name": "Everybody move it move it!"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Full stop!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Holla holla! You're a winning MACHINE! I'm gonna keep the party going but that's it for the games for now. PartyOn!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Oinkin", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Donut Drive-In",
                    "world": "Hyperion Nebula",
                    "noQuest": 3,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 1.83,
                    "starSign": "Aquarius",
                    "mothersMaidenName": "Reardon",
                    "notes": "[[Oinkin]] is found in [[Worlds#H3 - Donut Drive-In|Donut Drive-In]], on the bottom platform with the portal.$NEWLINE$$NEWLINE$Like other piggy NPCs, his quests award stamps. In addition to stamps, the rewards include [[Cooking Ladle|Cooking Ladles]] and [[Pet Egg|Pet Eggs]]"
                },
                "quests": {
                    "Filling the Menu": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well?? Don't just stand there you knobhead get cooking! <br> QUEST:Level up three meals to Lv.2 by delivering them to the Menu Dinner Table in town.",
                        "NextIndex": 4,
                        "Name": "Filling the Menu",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "StampB37", "quantity": 1},
                            <ComponentModel>{"item": "Ladle", "quantity": 4},
                            <ComponentModel>{"item": "PetEgg", "quantity": 4}
                        ],
                        "QuestName": "Oinkin1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Oinkin1",
                        "CustomArray": [<CustomReqModel>{"desc": "Lv.2 Meals:", "finalV": 3, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Diner Deliverer": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I've been getting complaints from the Egg Nest Station you need to fill those orders! <br> QUEST:Upgrade various pet upgrades using Grey DNA and meals.",
                        "NextIndex": 7,
                        "Name": "Diner Deliverer",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 6,
                        "Rewards": [
                            <ComponentModel>{"item": "StampB40", "quantity": 1},
                            <ComponentModel>{"item": "Ladle", "quantity": 5},
                            <ComponentModel>{"item": "PetEgg", "quantity": 4}
                        ],
                        "QuestName": "Oinkin2",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Oinkin2",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Genetic Splicing LV:", "finalV": 3, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Egg Capacity LV:", "finalV": 2, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Breedability Pulse LV:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Recipe for Fattening Pastry": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Look this one's important. I've got a VIP coming in tonight and I need the recipe for their favorite dish something known as the croissant... <br> QUEST:Discover the recipe for Croissants in cooking.",
                        "NextIndex": 10,
                        "Name": "Recipe for Fattening Pastry",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 9,
                        "Rewards": [
                            <ComponentModel>{"item": "StampB39", "quantity": 1},
                            <ComponentModel>{"item": "Ladle", "quantity": 6},
                            <ComponentModel>{"item": "PetEgg", "quantity": 4}
                        ],
                        "QuestName": "Oinkin3",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Oinkin3",
                        "CustomArray": [<CustomReqModel>{"desc": "Croissant Discovered:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Who ordered some pancakes with extra syrup to sip? <br> Was it you?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "No? Well someone did and they better come pick them up before it gets cold or I'm gonna go ham on them.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well?? Don't just stand there you knobhead get cooking! <br> QUEST:Level up three meals to Lv.2 by delivering them to the Menu Dinner Table in town.",
                        "NextIndex": 4,
                        "Name": "Filling the Menu"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory... full inventory!!! COME ON CLEAR THAT UP!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Good good! Good! But we're just getting started there's always more dishes to dish out!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I've been getting complaints from the Egg Nest Station you need to fill those orders! <br> QUEST:Upgrade various pet upgrades using Grey DNA and meals.",
                        "NextIndex": 7,
                        "Name": "Diner Deliverer"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory... full inventory!!! COME ON CLEAR THAT UP!",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That's solid cooking chef! You'll be a fine line cook in no time! <br> Are you waiting for more compliments? I'm not a complimenting machine get back to it!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Look this one's important. I've got a VIP coming in tonight and I need the recipe for their favorite dish something known as the croissant... <br> QUEST:Discover the recipe for Croissants in cooking.",
                        "NextIndex": 10,
                        "Name": "Recipe for Fattening Pastry"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory... full inventory!!! COME ON CLEAR THAT UP!",
                        "NextIndex": 8,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Now that's what I call non-raw cooking! I can't believe I'm saying this but that's all the cooking I can do for now... I'm all cooked out!",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Gobo", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Outer World Town",
                    "world": "Hyperion Nebula",
                    "noQuest": 5,
                    "repeatable": "Unknown",
                    "type": "",
                    "birthWeight": 4.26,
                    "starSign": "Pisces",
                    "mothersMaidenName": "Ramachandrannn}}n",
                    "notes": ""
                },
                "quests": {
                    "Breeding in Outer Space": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Lets uhmmm start with Breeding. Go to the eggs and breed a green mushroom. <br> QUEST:Breed a green mushroom in the Egg Nest station.",
                        "NextIndex": 5,
                        "Name": "Breeding in Outer Space",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 4,
                        "Rewards": [<ComponentModel>{"item": "PetEgg", "quantity": 3}, <ComponentModel>{"item": "PetEgg", "quantity": 3}],
                        "QuestName": "Gobo1",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gobo1",
                        "CustomArray": [<CustomReqModel>{"desc": "Breed Green Mushroom:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Intense Pet Fighting": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well I guess you need to do a Pet Battle. <br> QUEST:Back at the Egg Nest station win the first battle in the grasslands.",
                        "NextIndex": 8,
                        "Name": "Intense Pet Fighting",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 7,
                        "Rewards": [<ComponentModel>{"item": "PetEgg", "quantity": 3}, <ComponentModel>{"item": "PetEgg", "quantity": 3}],
                        "QuestName": "Gobo2",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gobo2",
                        "CustomArray": [<CustomReqModel>{"desc": "Pet Battle Won:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    },
                    "Squirrel Tactics": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I'm getting tired again go forage while I nap. You'll need a squirrel... QUEST:Unlock squirrel breeding by getting lucky while breeding the mushroom and place it in your newly claimed territory. Wait a bit then claim your spice!",
                        "NextIndex": 11,
                        "Name": "Squirrel Tactics",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 3,
                        "NoSpaceIndex": 10,
                        "Rewards": [
                            <ComponentModel>{"item": "Ladle", "quantity": 4},
                            <ComponentModel>{"item": "Ladle", "quantity": 4},
                            <ComponentModel>{"item": "PetEgg", "quantity": 3}
                        ],
                        "QuestName": "Gobo3",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gobo3",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Breed Squirrel:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Claim Spice:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Spicy Cooking": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Time to cook...! Ooo I like this part meals are my favorite other than sleeping... <br> QUEST:At the kitchen start cooking a new recipe using your spice. Use some of the Ladles Gobo gave you to finish it up instantly!",
                        "NextIndex": 14,
                        "Name": "Spicy Cooking",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 13,
                        "Rewards": [<ComponentModel>{"item": "Ladle", "quantity": 5}, <ComponentModel>{"item": "PetEgg", "quantity": 4}],
                        "QuestName": "Gobo4",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gobo4",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Start Recipe:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Finish Recipe:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "AFK in Kitchen Area", "finalV": 15, "type": "GreaterEqual", "startV": 0}
                        ]
                    },
                    "Lab Experimentation, Ft. You": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "..huh-wha? You can't go in the portal..? Uhhh have you tried the Lab yet? Go try that... I'll rest my eyes while you do... zzz... <br> QUEST:Upload a few  of your characters to the Lab Mainframe. You'll need more than 1 player uploaded to reach the 1st bonus!",
                        "NextIndex": 18,
                        "Name": "Lab Experimentation, Ft. You",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 2,
                        "NoSpaceIndex": 17,
                        "Rewards": [<ComponentModel>{"item": "Ladle", "quantity": 6}, <ComponentModel>{"item": "PetEgg", "quantity": 5}],
                        "QuestName": "Gobo5",
                        "Difficulty": 1,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Gobo5",
                        "CustomArray": [
                            <CustomReqModel>{"desc": "Upload Player to Lab:", "finalV": 1, "type": "GreaterEqual", "startV": 0},
                            <CustomReqModel>{"desc": "Light up 1st Bonus:", "finalV": 1, "type": "GreaterEqual", "startV": 0}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Zzzzz... zzzzzzz... uuuuug...? Ugh.. guhwha?",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Guhhhh... don't uh uhmm go through there. Not yet.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Lava man said you needa know howta do those thingies down there first before I can let you in there.",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Lets uhmmm start with Breeding. Go to the eggs and breed a green mushroom. <br> QUEST:Breed a green mushroom in the Egg Nest station.",
                        "NextIndex": 5,
                        "Name": "Breeding in Outer Space"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory clear that up before I fall back to Sl... zzz......",
                        "NextIndex": 3,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Zzz.... zz-wha? Ugh uh nice. Ok uh whats next hmmm...",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Well I guess you need to do a Pet Battle. <br> QUEST:Back at the Egg Nest station win the first battle in the grasslands.",
                        "NextIndex": 8,
                        "Name": "Intense Pet Fighting"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory clear that up before I fall back to Sl... zzz......",
                        "NextIndex": 6,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "That was actually kinda cool... I've never watched a pet battle I'm usually asleep when they happen.",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "I'm getting tired again go forage while I nap. You'll need a squirrel... QUEST:Unlock squirrel breeding by getting lucky while breeding the mushroom and place it in your newly claimed territory. Wait a bit then claim your spice!",
                        "NextIndex": 11,
                        "Name": "Squirrel Tactics"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory clear that up before I fall back to Sl... zzz......",
                        "NextIndex": 9,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Zzz.... guh oh uh you got the Spice? Great umm only a few more things... then I can sleep again.",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "Time to cook...! Ooo I like this part meals are my favorite other than sleeping... <br> QUEST:At the kitchen start cooking a new recipe using your spice. Use some of the Ladles Gobo gave you to finish it up instantly!",
                        "NextIndex": 14,
                        "Name": "Spicy Cooking"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory clear that up before I fall back to Sl... zzz......",
                        "NextIndex": 12,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Mmmmm I could smell that even from my dreamland! Mmmmm... you should make more of those! <br> Anyway you can go through the portal now that's all I was told to teach you... goodb...zzzzzz.....zz...",
                        "NextIndex": 15,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Zzz...zz... guhwha? Huh? Oh you're back... sorry I was just taking a nap...",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "..huh-wha? You can't go in the portal..? Uhhh have you tried the Lab yet? Go try that... I'll rest my eyes while you do... zzz... <br> QUEST:Upload a few  of your characters to the Lab Mainframe. You'll need more than 1 player uploaded to reach the 1st bonus!",
                        "NextIndex": 18,
                        "Name": "Lab Experimentation, Ft. You"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory clear that up before I fall back to Sl... zzz......",
                        "NextIndex": 16,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Zzzz.... nono lava I wont tell them... zzz... I wont tell them to drop sludge oil onto the purple spores.... zzz... nah lava secrets safe with... zzz... me...",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Nebula Neddy", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Unknown",
                    "world": "Unknown",
                    "noQuest": 0,
                    "repeatable": "Unknown",
                    "type": "Unknown",
                    "birthWeight": 2.73,
                    "starSign": "Cancer",
                    "mothersMaidenName": "Schiebeln}}n",
                    "notes": ""
                },
                "quests": {
                    "Task Requirement Affirmative": <ItemQuestModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Yes I am the taskmaster. You can do my tasks once you prove you're here to stay. <br> QUEST:Gather some monster parts to show you're ready to take on the World 4 tasks!",
                        "NextIndex": 4,
                        "Name": "Task Requirement Affirmative",
                        "ConsumeItems": true,
                        "InventorySpacesNeeded": 1,
                        "NoSpaceIndex": 3,
                        "Rewards": [
                            <ComponentModel>{"item": "Ladle", "quantity": 48},
                            <ComponentModel>{"item": "PetEgg", "quantity": 12},
                            <ComponentModel>{"item": "PureWater2", "quantity": 15}
                        ],
                        "QuestName": "Nebula Neddy1",
                        "Difficulty": 4,
                        "note": <NoteModel>{"note": " "},
                        "ItemReq": [
                            <ComponentModel>{"item": "GalaxyA1", "quantity": 200},
                            <ComponentModel>{"item": "GalaxyA2", "quantity": 400},
                            <ComponentModel>{"item": "GalaxyA3", "quantity": 750}
                        ]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Greetings. Your presence has been acknowledged let us commence proper conversation.",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "I am not familiar with you. You must be new. Welcome to the Nebula.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.ItemsAndSpaceRequired,
                        "DialogueText": "Yes I am the taskmaster. You can do my tasks once you prove you're here to stay. <br> QUEST:Gather some monster parts to show you're ready to take on the World 4 tasks!",
                        "NextIndex": 4,
                        "Name": "Task Requirement Affirmative"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Full inventory! Full stop!",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "This is.... acceptable. You may proceed to the Task TV behind me.",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            }),
        new NpcBase("Eliteus", <NpcModel>{
                "head": <NpcHeadModel>{
                    "location": "Unknown",
                    "world": "Unknown",
                    "noQuest": 0,
                    "repeatable": "Unknown",
                    "type": "Unknown",
                    "birthWeight": 4.46,
                    "starSign": "Libra",
                    "mothersMaidenName": "Darnell",
                    "notes": ""
                },
                "quests": {
                    "The Greenie Gucci Gang": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "YO it's the Greenie Gang ice them fools and you've got one of them classes comin' your way dog. <br> QUEST:Defeat all the Greenie Genies in the Greenie Gang.",
                        "NextIndex": 3,
                        "Name": "The Greenie Gucci Gang",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 2,
                        "Rewards": [<CoinRewardModel>{"item": "", "quantity": 750000000}],
                        "QuestName": "Eliteus1",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Eliteus1",
                        "CustomArray": [<CustomReqModel>{
                            "desc": "Defeat the Greenie Gang:",
                            "finalV": 10,
                            "type": "GreaterEqual",
                            "startV": 0
                        }]
                    },
                    "Elite Class for the Elites in Class": <CustomQuestModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 5,
                        "Name": "Elite Class for the Elites in Class",
                        "ConsumeItems": false,
                        "InventorySpacesNeeded": 0,
                        "NoSpaceIndex": 4,
                        "Rewards": [<CoinRewardModel>{"item": "", "quantity": 150964823}],
                        "QuestName": "Eliteus2",
                        "Difficulty": 5,
                        "note": <NoteModel>{"note": " "},
                        "CustomType": "Eliteus2",
                        "CustomArray": [<CustomReqModel>{"desc": "Select an Elite Class:", "finalV": 1, "type": "GreaterEqual", "startV": 0}]
                    }
                },
                "dialogue": [
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yo wuz gucci man how we doin...",
                        "NextIndex": 1,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "You here for them elite classes huh? Aight check it I gotchu with one of them classes but you gotta show me you can hang with it first.",
                        "NextIndex": 2,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "YO it's the Greenie Gang ice them fools and you've got one of them classes comin' your way dog. <br> QUEST:Defeat all the Greenie Genies in the Greenie Gang.",
                        "NextIndex": 3,
                        "Name": "The Greenie Gucci Gang"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yoooooo haha love that! Man they up and DIPPED once you started slappin' them around bwhahaha! <br> Aight fairs fair here's your own elite class.",
                        "NextIndex": 4,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.Custom,
                        "DialogueText": "",
                        "NextIndex": 5,
                        "Name": "Elite Class for the Elites in Class"
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Yous is one of them elites now dog go shine on them world 3 haters always givin' you them salty looks. They just mad jealous you one of them winners and they aint got it like you got it.",
                        "NextIndex": 5,
                        "Name": ""
                    },
                    <DialogueLineModel>{
                        "Type": QuestTypeEnum.NoQuest,
                        "DialogueText": "Bruh what even ARE you...? Ain't never saw that class you got there is that even legit?",
                        "NextIndex": -1,
                        "Name": ""
                    }
                ]
            })    
]
}
