import { CaseOutcomeModel } from '../model/caseOutcomeModel';
import { CaseOutcomeTypeEnum } from '../enum/caseOutcomeTypeEnum';
import { CourtCaseModel } from '../model/courtCaseModel';
import { CourtCheckTypeEnum } from '../enum/courtCheckTypeEnum';

export class CourtCaseBase { constructor(public index: number, public data: CourtCaseModel) { } }



export const initCourtCaseRepo = () => {
    return [    
        new CourtCaseBase(0, <CourtCaseModel>{
                "person": "Little Timmy",
                "desc": "Can I has { coins pwease?",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 2}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(1, <CourtCaseModel>{
                "person": "Reainmated Hand",
                "desc": "I got fined { coins by YOUR LAWS for using the 5 finger discount! Can you waive this fine? I really don't want to pay it!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "rejectOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 2},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}
                ],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(2, <CourtCaseModel>{
                "person": "Head Honcho of Big Biz LLC",
                "desc": "Your honor, I seek an investment of { coins in order to grow my Student Loans company and acquire new victims. I promise your money will double by next time you see me.",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -3},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 2}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(3, <CourtCaseModel>{
                "person": "Head Honcho of Big Biz LLC",
                "desc": "Good afternoon, I represent a third party who would like to buy your popularity, yes ALL of it, for 2 coins per pop. Would you be interested in this?",
                "approveOutcome": [],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(4, <CourtCaseModel>{
                "person": "Little Timmy",
                "desc": "Hewwo OwO can u tell everyone they are stinky heads? Also ummmmmmmm... are you skibbidy??!?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(5, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "It's a heart attack. You're currently in the hospital, you'll make a full recovery if you pay { coins for the best cardiologist.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -5}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(6, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "You're in a coma. Yea, car crash on your way to the next court case. You'll recover, but only if you pay { coins to cover the doctor fees.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -4}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(7, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "Snake attack during a weekend hike. You really are quite the extravert! But, the venom will cause quite a lot of stress if you don't buy the cure... last I checked, it currently goes for { coins.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -4}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(8, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "Shark attack during a weekend hike in the ocean. You REALLY are quite the extravert. But, without proper care that wound is going to get a lot worse! It's gonna be { coins for full medicare.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -3}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(9, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "Well that Stream could have gone better... you're a Millennial judge, of course you stream in your free time. Look, unless you give me { coins to wipe your memory, you're going to feel REALLY bad for a long time. Like, really bad.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -4}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(10, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "Uhhh... hey...? Why am I here? You seem fine. But, since I AM here, I'm a bit short on rent. Soooo give me { coins, or I'll be taking 1 mental health of yours!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -3}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(11, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "Blocked artery. Your spouse rushed you to the hospital at quite the pace, you should say thanks if you ever see them again! The bill is looking to be about { coins, are you ready to pay up?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -4}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(12, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "Someone you rejected is putting their plot into action... yea, like, right now. Don't be too surprised, you're really not that popular. You won't come out unscathed unless you pay { coins to hire a better Bailiff.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -6}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(13, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "No no, I'm not here for you. It's... well, it's Little Timmy. After that 3rd rejection, he ran home crying and won't come out of his room. It's gonna cost you { coins to make him feel better, or you can just live with the guilt.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -8}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(14, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "Uh oh, looks like your bills finally got the better of you! I guess managing money ain't so easy after all. Look, if you give me } popularity, I'll save you the embarassment of an empty coffer.",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.PopCheck
            }),
        new CourtCaseBase(15, <CourtCaseModel>{
                "person": "The Harbinger",
                "desc": "You're broke...? AGAIN??? I even gave you a coin myself last time! Nope, you're not weaseling your way out of this one you sneaky beaky. Approve, reject, dismiss, I don't care, I'm taking some of your mental with me.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(16, <CourtCaseModel>{
                "person": "Reainmated Hand",
                "desc": "Good going judge, your STUPID laws just got me arrested! You HAVE to pay my bail of { coins, you OWE me for enforcing such dumb rules!!!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -3},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(17, <CourtCaseModel>{
                "person": "Reainmated Hand",
                "desc": "Here judge, I brought the { coins I owe for my previous misdemeanors. Just shake my hand first, I promise I wont do anything to damage your mental health! Hehehe...",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 5},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(18, <CourtCaseModel>{
                "person": "Mister Bribe",
                "desc": "Hey pal, how we doin'? You lookin' for some extra cash? I got { coins on me, take em! Don't ask questions, 'specially 'bout where I got 'em from.",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 3},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(19, <CourtCaseModel>{
                "person": "Mister Bribe",
                "desc": "Hey friendo. Is me again, what's good? I got a huge score, and wanted to share some of it! Here, have { coins, but your mental health will take a hit when you hear the news tonight...",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 7},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(20, <CourtCaseModel>{
                "person": "Mister Bribe",
                "desc": "Aight, check it. I ain't done no dirty tricks this time, I got a shiny clean coin right 'ere, just for you! Seriously, take it!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(21, <CourtCaseModel>{
                "person": "Retirement Chester",
                "desc": "Retirement is important, trust me I'd know! I'll give you 1 retirement chest, but it'll cost you { coins.",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -2}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(22, <CourtCaseModel>{
                "person": "Retirement Chester",
                "desc": "Retirement is the key to happiness, trust me I'd know! I'll give you 1 retirement chest, but it'll cost you } popularity.",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.PopCheck
            }),
        new CourtCaseBase(23, <CourtCaseModel>{
                "person": "Scripticus",
                "desc": "Oh boy, I'm in the Justice Monument minigame again! Wanna trade some of your coins for my popularity? Also it's ok if you don't have enough coins, I have plenty of popularity to go around!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -2},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(24, <CourtCaseModel>{
                "person": "Scripticus",
                "desc": "Hey it's me, everyone's favorite wiggly piece of paper! I really want to help the next guy, can you PROMISE me you'll Approve the next case? I'll give you { coins. Please?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 3}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(25, <CourtCaseModel>{
                "person": "The Gratefulbinger",
                "desc": "I've been watching you closely, and I wanted to thank you for everything you've done for the community with a gift of { coins, and 1 Retirement Chest!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 5},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -999}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(26, <CourtCaseModel>{
                "person": "Esquire Bored Bean",
                "desc": "Mmmm yeeees, charmed your honor. Perchance could I get a loan of all your money? I will give it all back next you see me, and you would make me one very happy bean oh hohoho yeeees!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 12}],
                "rejectOutcome": [],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(27, <CourtCaseModel>{
                "person": "Esquire Bored Bean",
                "desc": "Huzzah, it is I! Would you like to buy a mental health, perchance? I doooo have the greatest mind ever to grace this court! All it will cost you is... HALF of all your coins!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": 1}],
                "rejectOutcome": [],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(28, <CourtCaseModel>{
                "person": "Esquire Bored Bean",
                "desc": "Hark, I have returned bearing the gift of a Retirement Chest, albeit only if you can solve my riddle. Tell me magistrate... as I am royalty, what action to me speaks loudest, yet not at all?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(29, <CourtCaseModel>{
                "person": "Esquire Bored Bean",
                "desc": "I have a deeeelightful proposition for you! Every time you Approve a case, I will give 4 coins. However, two rejections and I will make you infinitely unpopular. Any Case Dismissal will void this deal.",
                "approveOutcome": [],
                "rejectOutcome": [],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(30, <CourtCaseModel>{
                "person": "Little Timmy",
                "desc": "Can u subskwibe to my yootoob channel pwease?? Is free!!!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -2}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(31, <CourtCaseModel>{
                "person": "Mister Bribe",
                "desc": "Eyo was up my guy, I got a bit of a deal for ya. { coins, but you can't Approve that Little Timmy fella next you see him. Whatchu think?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 3}],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(32, <CourtCaseModel>{
                "person": "Little Timmy",
                "desc": "I stole my fwends toy, and he said I am under arrest. Can I be free pwease? I will give u { coins... did I do bribe right? Daddy teached it to me today!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(33, <CourtCaseModel>{
                "person": "Retirement Chester",
                "desc": "Retirement is everything, trust me I'd know! I'll give you 1 retirement chest, but I want 1 mental health... unless you're down to your last one, then you can have the chest free.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1}],
                "rejectOutcome": [],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(34, <CourtCaseModel>{
                "person": "Scripticus",
                "desc": "Can I get a { coin loan to buy my next kitchen in World 4? I play the game too you know! I'll give you back the coins plus interest next time you see me, AND you'll have my gratitude!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -2},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(35, <CourtCaseModel>{
                "person": "Head Honcho of Big Biz LLC",
                "desc": "Greetings, I come to you today seeking a } popularity investment since my last company spilled some, well, accidentally spilled... look, I am willing to offer a LOT of coins!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 3}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity, CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.PopCheck
            }),
        new CourtCaseBase(36, <CourtCaseModel>{
                "person": "Head Honcho of Big Biz LLC",
                "desc": "Greetings, I come to you today seeking a { coin investment in my time management company. I guarantee you a 250% return, but it will take 15 court cases to mature.",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -5}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(37, <CourtCaseModel>{
                "person": "Retirement Chester",
                "desc": "Retirement is the top priority, trust me! I'll give you 1 retirement chest to get you going, but I'll be taking { coins and } popularity whether you have them or not!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -2},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(38, <CourtCaseModel>{
                "person": "Mister Bribe",
                "desc": "Ok dog hear me out, I had this dope idea while I was drying out yesterday... a reverse bribe! You give me { coins, and I'll boost your popularity",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(39, <CourtCaseModel>{
                "person": "Retirement Chester",
                "desc": "Retirement is the number one source of all things good, trust me! I'll give you 1 retirement chest completely free just to show you how right I am!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1}],
                "rejectOutcome": [],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(40, <CourtCaseModel>{
                "person": "Cool Bird",
                "desc": "Sup. Heads you win a bunch of coins, Tails you lose some coins. You wanna flip for it?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 3}],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(41, <CourtCaseModel>{
                "person": "Cool Bird",
                "desc": "Sup. Heads you dope as heck, Tails you fail the vibe check. You wanna flip for it?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 2}],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(42, <CourtCaseModel>{
                "person": "Cool Bird",
                "desc": "Sup. Heads you win 2 Retirement Chests, Tails you lose 1 Retirement Chest. You wanna flip for it?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 2}],
                "rejectOutcome": [],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(43, <CourtCaseModel>{
                "person": "Head Honcho of Big Biz LLC",
                "desc": "Greetings, I have a fantastic opportunity for you! For just { coins, I will invest in a crypto coin and will share the profits! 1 coin returned every day for 15 days!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -6},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(44, <CourtCaseModel>{
                "person": "Grumblo",
                "desc": "Me like coin. Me collect coin! You give me { coin, I give you random gift!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(45, <CourtCaseModel>{
                "person": "Grumblo",
                "desc": "Me like coin. Me collect coin! You give me { coin, I give you random gift!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 3}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity, CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(46, <CourtCaseModel>{
                "person": "Grumblo",
                "desc": "Me like coin. Me collect coin! You give me { coin, I give you random gift!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": 1}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(47, <CourtCaseModel>{
                "person": "Grumblo",
                "desc": "Me like coin. Me collect coin! You give me { coin, I give you random gift!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 2}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(48, <CourtCaseModel>{
                "person": "Little Timmy",
                "desc": "Can u make today a holiday so school is no?",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -3},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 2}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(49, <CourtCaseModel>{
                "person": "Chippy",
                "desc": "Eat me eat me eat me!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(50, <CourtCaseModel>{
                "person": "Ghost",
                "desc": "Can you make it legal for me to scare people? I'll pay you handsomely, but I'll keep scaring 1 person every day, FOooOooOREVER...",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 6}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(51, <CourtCaseModel>{
                "person": "Reainmated Hand",
                "desc": "You look richer than the guy I just stole from. Give me one of your retirement chests, and I'll tell all the other Reanimated Limbs back home what a legend you are!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 4}
                ],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.ChestCheck
            }),
        new CourtCaseBase(52, <CourtCaseModel>{
                "person": "Retirement Chester",
                "desc": "Retirement is worth considering, trust me I'd know! I'll give you 1 retirement chest, but it'll cost you { coins.",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": 1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -3}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(53, <CourtCaseModel>{
                "person": "Head Honcho of Big Biz LLC",
                "desc": "Good afternoon, I am seeking invesetment in my new Retirement Hedgefund! For just 1 Retirement Chest, you will receive royalties of 2 coins per day for 10 days!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Chest, "qty": -1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.ChestCheck
            }),
        new CourtCaseBase(54, <CourtCaseModel>{
                "person": "Cool Bird",
                "desc": "Sup. Heads you the man and get 2 mental health, Tails you crazy and lose 1 mental health. You wanna flip for it?",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": 2}],
                "rejectOutcome": [],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(55, <CourtCaseModel>{
                "person": "Fizarre Drink",
                "desc": "I'm not a free drink, { coin please! My effects? Well, this time around I grant the consumer some sort of Chest Magnetizer effect, lasts for 3 days I reckon...",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1}],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(56, <CourtCaseModel>{
                "person": "Fizarre Drink",
                "desc": "I'm not a free drink, { coin please! My effects? Well, this time 'round I grant the consumer a LOT of pop!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins, CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(57, <CourtCaseModel>{
                "person": "Fizarre Drink",
                "desc": "I'm not a free drink, { coin please! My effects? Well, this time 'round I grant the consumer 2 dismissals, but I am known in the state of Blunder Hills to cause mental fatigue!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Dismissals, "qty": 2},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.MentalHealth, "qty": -1}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(58, <CourtCaseModel>{
                "person": "Fizarre Drink",
                "desc": "I'm not a free drink, { coin please! My effects? Well, this time 'round I grant the consumer a strange ability to never ever become unpopular! Like, ever!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1}],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(59, <CourtCaseModel>{
                "person": "Ghost",
                "desc": "I'm done scaring people... I thought it was funny for a while, but now I just feel bad. Can you reinstate the ban, make it illegal again? I'll pay you!",
                "approveOutcome": [
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 4},
                    <CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 1}
                ],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(60, <CourtCaseModel>{
                "person": "Fizarre Drink",
                "desc": "I'm not a free drink, { coin please! My effects? Well, this time I'm just a normal drink, but there's a 1 in 4 chance I'm the limited edition glass all the internet nerds want to buy!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": -1}],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.CoinCheck
            }),
        new CourtCaseBase(61, <CourtCaseModel>{
                "person": "Esquire Bored Bean",
                "desc": "Ohohoho I have heard the stories about you judge! Oh yes indeed! Gulp gulp gulp, say no more! Shall we keep this a secret between us? Oh how I do LOVE secrets!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 2}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -4}],
                "currencyScalePer5": [CaseOutcomeTypeEnum.Popularity],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(62, <CourtCaseModel>{
                "person": "Reainmated Hand",
                "desc": "You are SO dumb, forcing me here whenever I break your dumb rules. Can you just make me above the law? I'll share part what I steal every time you see me, I'll even share the blame!",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": -1}],
                "rejectOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.Popularity, "qty": 2}],
                "currencyScalePer5": [],
                "coincheck": CourtCheckTypeEnum.No
            }),
        new CourtCaseBase(63, <CourtCaseModel>{
                "person": "Mister Bribe",
                "desc": "Hey buddy, how's the grind going? Look, I got { coins on me, and you can have them all!!! Only thing is, for 3 days you won't be able to Approve anything...",
                "approveOutcome": [<CaseOutcomeModel>{"category": CaseOutcomeTypeEnum.CourtCoins, "qty": 7}],
                "rejectOutcome": [],
                "currencyScalePer5": [CaseOutcomeTypeEnum.CourtCoins],
                "coincheck": CourtCheckTypeEnum.No
            })    
]
}
