import { AchievementModel } from '../model/achievementModel';

export class AchievementBase { constructor(public index: number, public data: AchievementModel) { } }



export const initAchievementRepo = () => {
    return [    
        new AchievementBase(0, <AchievementModel>{
                "name": "Learn 2 Forge",
                "qty": 1,
                "desc": "Get the mining certificate from Glumlee.",
                "rewards": "*STEAM EXCLUSIVE &*10 gems &*1hr time candy",
                "world": "Blunder Hills"
            }),
        new AchievementBase(1, <AchievementModel>{
                "name": "Another Me!",
                "qty": 1,
                "desc": "Create a 2nd character. Trust me, you wanna do this ASAP.",
                "rewards": "*STEAM EXCLUSIVE &*8 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(2, <AchievementModel>{
                "name": "Sleepy Gamer",
                "qty": 1,
                "desc": "Claim 100+ hours of AFK rewards.",
                "rewards": "*STEAM EXCLUSIVE &*5 gems &*1hr time candy",
                "world": "Blunder Hills"
            }),
        new AchievementBase(3, <AchievementModel>{
                "name": "Classy!",
                "qty": 1,
                "desc": "Choose one of the 3 starting classes from Promotheus.",
                "rewards": "*STEAM EXCLUSIVE &*18 gems &*2hr time candy",
                "world": "Blunder Hills"
            }),
        new AchievementBase(4, <AchievementModel>{
                "name": "Hitting the Mark",
                "qty": 1,
                "desc": "Chop 15 yellow sections in a row during the Choppin' Minigame.",
                "rewards": "5% Chopping EXP for &all character",
                "world": "Blunder Hills"
            }),
        new AchievementBase(5, <AchievementModel>{
                "name": "Learn 2 Entertain",
                "qty": 1,
                "desc": "Get the golden jam from the Picnic Stowaway.",
                "rewards": "*STEAM EXCLUSIVE &*15 gems &*2hr time candy",
                "world": "Blunder Hills"
            }),
        new AchievementBase(6, <AchievementModel>{
                "name": "5 'hunned Copper",
                "qty": 1,
                "desc": "Have a stack of exactly 500 Copper Ore in your Storage Chest.",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(7, <AchievementModel>{
                "name": "Rookie Player",
                "qty": 1,
                "desc": "Reach level 20 on any character.",
                "rewards": "*STEAM EXCLUSIVE &*8 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(8, <AchievementModel>{
                "name": "1.5 Ki'log'grams",
                "qty": 1,
                "desc": "Have a stack of exactly 1500 Oak Logs in your Storage Chest.",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(9, <AchievementModel>{
                "name": "Small Savings",
                "qty": 1,
                "desc": "Save up 10000 coins.",
                "rewards": "*STEAM EXCLUSIVE &*8 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(10, <AchievementModel>{
                "name": "Copper Quipment",
                "qty": 1,
                "desc": "Equip the Copper Helmet and Copper Platebody",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(11, <AchievementModel>{
                "name": "The Sculpture Within",
                "qty": 1,
                "desc": "Buy the Sculpting Tools from the Blunder Hills town shop",
                "rewards": "*STEAM EXCLUSIVE &*10 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(12, <AchievementModel>{
                "name": "Card Collector",
                "qty": 1,
                "desc": "Collect 10 unique cards. They drop randomly from monsters!",
                "rewards": "*STEAM EXCLUSIVE &*8 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(13, <AchievementModel>{
                "name": "Do What You're Told",
                "qty": 1,
                "desc": "Complete 25 unique quests. Unique here means different, not interesting btw lol",
                "rewards": "*STEAM EXCLUSIVE &*8 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(14, <AchievementModel>{
                "name": "Learn 2 Translate",
                "qty": 1,
                "desc": "Get the scouting report from Stiltzcho, the friendly jungle leaf",
                "rewards": "*STEAM EXCLUSIVE &*20 gems &*2 '2hr time candy'",
                "world": "Blunder Hills"
            }),
        new AchievementBase(15, <AchievementModel>{
                "name": "Wode Together",
                "qty": 250,
                "desc": "Defeat 250 Wode Boards with at least 1 other party member",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(16, <AchievementModel>{
                "name": "2 Tons of Iron",
                "qty": 1,
                "desc": "Have a stack of exactly 2,000 Iron Ore in your Storage Chest.",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(17, <AchievementModel>{
                "name": "Giga Decimation",
                "qty": 1,
                "desc": "Defeat all Giga Frogs before any respawn.",
                "rewards": "*Encroaching Forest BG &for Title Screen",
                "world": "Blunder Hills"
            }),
        new AchievementBase(18, <AchievementModel>{
                "name": "Shut it Poochy",
                "qty": 1,
                "desc": "Defeat Amarok, the stone golem wolf of the Encroaching Forest.",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(19, <AchievementModel>{
                "name": "Average Player",
                "qty": 1,
                "desc": "Reach level 40 on any character",
                "rewards": "*STEAM EXCLUSIVE &*12 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(20, <AchievementModel>{
                "name": "Slimeicidal Endeavor",
                "qty": 1,
                "desc": "Defeat 25,000 slimes in total. This counts kills from all your characters!",
                "rewards": "*Jungle Background &for Title Screen",
                "world": "Blunder Hills"
            }),
        new AchievementBase(21, <AchievementModel>{
                "name": "Right to Bear Iron",
                "qty": 1,
                "desc": "Equip an Iron Helmet, Iron Chestplate, Iron Pants, and one Iron Tool.",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(22, <AchievementModel>{
                "name": "5-6 Pick up Sticks",
                "qty": 1,
                "desc": "Have a stack of exactly 20,000 Sticks in your Storage Chest.",
                "rewards": "*Tree Interior BG &for Title Screen",
                "world": "Blunder Hills"
            }),
        new AchievementBase(23, <AchievementModel>{
                "name": "20 Bundles of Jungle",
                "qty": 1,
                "desc": "Have a stack of exactly 20,000 Forest Fibers in your Storage Chest.",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(24, <AchievementModel>{
                "name": "Colosseum Contender",
                "qty": 1,
                "desc": "Get a score of 25,000 or more in the Dewdrop Colosseum.",
                "rewards": "*RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(25, <AchievementModel>{
                "name": "Crystal Beatdown",
                "qty": 1,
                "desc": "Defeat a Crystal monster, who have a 1 in 2000 chance of spawning when a monster dies.",
                "rewards": "*STEAM EXCLUSIVE &*8 gems &*2 '1hr time candy'",
                "world": "Blunder Hills"
            }),
        new AchievementBase(26, <AchievementModel>{
                "name": "Ten Trips of Gold",
                "qty": 1,
                "desc": "Have a stack of exactly 30,000 Gold Ore in your Storage Chest.",
                "rewards": "*Mining Cave Background &for Title Screen",
                "world": "Blunder Hills"
            }),
        new AchievementBase(27, <AchievementModel>{
                "name": "Minecart Maniac",
                "qty": 1,
                "desc": "Slam on a yellow ore vein in the Mining Minigame, which gives 3 points!",
                "rewards": "5% Mining EXP Bonus &for all characters",
                "world": "Blunder Hills"
            }),
        new AchievementBase(28, <AchievementModel>{
                "name": "Spike Minigame Master",
                "qty": 1,
                "desc": "Get a score of 13 in the spike minigame. Remember to say 'If u love me let me go'",
                "rewards": "*STEAM EXCLUSIVE &*20 gems &*4hr Time Candy",
                "world": "Blunder Hills"
            }),
        new AchievementBase(29, <AchievementModel>{
                "name": "Anvil Expansion",
                "qty": 1,
                "desc": "Craft the anvil expander, and unlock a new tab of item recipes!",
                "rewards": "*STEAM EXCLUSIVE &*10 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(30, <AchievementModel>{
                "name": "Steppin' on the Rats",
                "qty": 500,
                "desc": "Defeat 500 Rats with at least 1 other party member",
                "rewards": "*Sewers BG",
                "world": "Blunder Hills"
            }),
        new AchievementBase(31, <AchievementModel>{
                "name": "Tree Top Dropout",
                "qty": 1,
                "desc": "Reach the top of the Giant Tree in Blunder Hills",
                "rewards": "*STEAM EXCLUSIVE &*15 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(32, <AchievementModel>{
                "name": "Naked and Unafraid",
                "qty": 1,
                "desc": "Enter the Sewers with no equipment or weapon, and defeat a sewer poop. Don't want to get your stuff dirty!",
                "rewards": "*RNG item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(33, <AchievementModel>{
                "name": "House Flipper",
                "qty": 1,
                "desc": "Defeat Baba Yaga in under 25 seconds after they spawn in the Birch Enclave",
                "rewards": "RNG Item unlock",
                "world": "Blunder Hills"
            }),
        new AchievementBase(34, <AchievementModel>{
                "name": "Platinum 200G",
                "qty": 1,
                "desc": "Have a stack of exactly 200,000 Platinum Ore in your Storage Chest.",
                "rewards": "*W1 Boss Key EZ-Access",
                "world": "Blunder Hills"
            }),
        new AchievementBase(35, <AchievementModel>{
                "name": "Guild Member",
                "qty": 1,
                "desc": "Claim 500 GP for your guild.",
                "rewards": "*STEAM EXCLUSIVE &*14 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(36, <AchievementModel>{
                "name": "Boss Buster",
                "qty": 1,
                "desc": "Defeat both minibosses in Blunder Hills",
                "rewards": "*STEAM EXCLUSIVE &*15 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(37, <AchievementModel>{
                "name": "Nutty Crafter",
                "qty": 42,
                "desc": "Craft 42 golden peanuts, whatever those might be!",
                "rewards": "5% Gold Food Bonus &for all characters",
                "world": "Blunder Hills"
            }),
        new AchievementBase(38, <AchievementModel>{
                "name": "Minecart Master",
                "qty": 1,
                "desc": "Get a score of 103+ in the Mining Minigame, beating the developers highscore!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*2 '4hr time candy'",
                "world": "Blunder Hills"
            }),
        new AchievementBase(39, <AchievementModel>{
                "name": "Choppin' to the Beat",
                "qty": 1,
                "desc": "Get a score of 141+ in the Choppin' Minigame, beating the developers highscore!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*4hr time candy",
                "world": "Blunder Hills"
            }),
        new AchievementBase(40, <AchievementModel>{
                "name": "Decked Out in Gold",
                "qty": 1,
                "desc": "Equip Golden Helmet, Chestplate, Pants, Shoes, two Golden tools, and the Defenders Dignity ring.",
                "rewards": "*3% Arcade balls/hr",
                "world": "Blunder Hills"
            }),
        new AchievementBase(41, <AchievementModel>{
                "name": "Nice Fur Suit",
                "qty": 1,
                "desc": "Equip all 4 pieces of Amarok armor.",
                "rewards": "*Forest Villa Teleport",
                "world": "Blunder Hills"
            }),
        new AchievementBase(42, <AchievementModel>{
                "name": "Half a Mill-log",
                "qty": 1,
                "desc": "Have a stack of exactly 500,000 Veiny Logs in your Storage Chest.",
                "rewards": "*W1 Colosseum EZ-Access &*W1 Shops EZ-Access",
                "world": "Blunder Hills"
            }),
        new AchievementBase(43, <AchievementModel>{
                "name": "Bad Doggy!",
                "qty": 1,
                "desc": "Defeat Chaotic Amarok.",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*2 '2hr time candy'",
                "world": "Blunder Hills"
            }),
        new AchievementBase(44, <AchievementModel>{
                "name": "Two-Time Savior",
                "qty": 2,
                "desc": "Equip the Blunder Hero Trophy, while also having another in your inventory.",
                "rewards": "5% Faster Respawn for &all Blunder Hills mobs",
                "world": "Blunder Hills"
            }),
        new AchievementBase(45, <AchievementModel>{
                "name": "Million Null 'n Void",
                "qty": 1,
                "desc": "Have a stack of exactly 1,000,000 Void Ore in your Storage Chest.",
                "rewards": "*Deep Mining Teleport",
                "world": "Blunder Hills"
            }),
        new AchievementBase(46, <AchievementModel>{
                "name": "Lucky 7s",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Punch a monster, win the Jackpot! Well, hypothetically...",
                "rewards": "*1% Arcade balls/hr &*15 Gems &*7 '1hr time candy'",
                "world": "Blunder Hills"
            }),
        new AchievementBase(47, <AchievementModel>{
                "name": "What a View!",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Climb the 2nd tallest tree in all of Blunder Hills, and say 'Great view, 1 star'",
                "rewards": "*1% Arcade balls/hr",
                "world": "Blunder Hills"
            }),
        new AchievementBase(48, <AchievementModel>{
                "name": "Cavernous Nook",
                "qty": 1,
                "desc": "-",
                "rewards": "*Knowledge of the &Cavern Secret Location",
                "world": "Blunder Hills"
            }),
        new AchievementBase(49, <AchievementModel>{
                "name": "Seriousleaf-ast!",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Score a point in the Choppin' Minigame while the leaf is zooming at hyperspeed",
                "rewards": "*1% Arcade balls/hr",
                "world": "Blunder Hills"
            }),
        new AchievementBase(50, <AchievementModel>{
                "name": "Peanut Pioneer",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Talk to the jungle bush, join the club...",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*2 '2hr time candy'",
                "world": "Blunder Hills"
            }),
        new AchievementBase(51, <AchievementModel>{
                "name": "Meel Time!",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Shake it! To the left, to the left! Oh yea!!!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(52, <AchievementModel>{
                "name": "Pro Gamer Move",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Keep the oil. Precious, precious oil...",
                "rewards": "*STEAM EXCLUSIVE &*10 gems &*1hr time candy",
                "world": "Blunder Hills"
            }),
        new AchievementBase(53, <AchievementModel>{
                "name": "Meet the Dev",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ I heard he's 12 feet tall and can spawn bosses just by talking...",
                "rewards": "*STEAM EXCLUSIVE &*40 gems &*4 '2hr time candy'",
                "world": "Blunder Hills"
            }),
        new AchievementBase(54, <AchievementModel>{
                "name": "Heyo!",
                "qty": 1,
                "desc": "Say 'Hi' to 250 different people without closing the game.",
                "rewards": "*5 'Tab 1' Talent Pts &*1% Arcade balls/hr",
                "world": "Blunder Hills"
            }),
        new AchievementBase(55, <AchievementModel>{
                "name": "Anothervil Expansion",
                "qty": 1,
                "desc": "Craft the Anvil III expander. More things to craft, hooray!",
                "rewards": "*STEAM EXCLUSIVE &*30 gems",
                "world": "Blunder Hills"
            }),
        new AchievementBase(56, <AchievementModel>{
                "name": "Based Roots",
                "qty": 20,
                "desc": "Reach The Roots, which is the map below the Sticks monsters in the Giant Tree",
                "rewards": "*Acorn Hat Recipe",
                "world": "Blunder Hills"
            }),
        new AchievementBase(57, <AchievementModel>{
                "name": "Dungeon Pinch",
                "qty": 1,
                "desc": "Deal 100 or more damage in a single hit in any party dungeon.",
                "rewards": "*1% Class EXP bonus &for all characters",
                "world": "Blunder Hills"
            }),
        new AchievementBase(58, <AchievementModel>{
                "name": "Big Frog Angry",
                "qty": 1,
                "desc": "Defeat Grandfrogger on his 1st Difficulty.",
                "rewards": "*2% Total DMG for all &characters outside &of dungeons",
                "world": "Blunder Hills"
            }),
        new AchievementBase(59, <AchievementModel>{
                "name": "Big Frog Furious",
                "qty": 1,
                "desc": "Defeat Grandfrogger on his 2nd Difficulty.",
                "rewards": "*3% Total DMG for all &characters outside &of dungeons",
                "world": "Blunder Hills"
            }),
        new AchievementBase(60, <AchievementModel>{
                "name": "Big Frog Big Sad",
                "qty": 1,
                "desc": "Defeat Grandfrogger on his 3rd Difficulty.",
                "rewards": "*5% Total DMG for all &characters outside &of dungeons",
                "world": "Blunder Hills"
            }),
        new AchievementBase(61, <AchievementModel>{
                "name": "2 minute meal",
                "qty": 1,
                "desc": "Spawn Grandfrogger within 2 minutes of entering the dungeon.",
                "rewards": "*3% Class EXP bonus &for all characters",
                "world": "Blunder Hills"
            }),
        new AchievementBase(62, <AchievementModel>{
                "name": "Big Frog Big Mad",
                "qty": 1,
                "desc": "Defeat Grandfrogger on his 4th Difficulty, and avoid becoming one with the soup...",
                "rewards": "*5% Total DMG for all &characters outside &of dungeons",
                "world": "Blunder Hills"
            }),
        new AchievementBase(63, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Blunder Hills"
            }),
        new AchievementBase(64, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Blunder Hills"
            }),
        new AchievementBase(65, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Blunder Hills"
            }),
        new AchievementBase(66, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Blunder Hills"
            }),
        new AchievementBase(67, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Blunder Hills"
            }),
        new AchievementBase(68, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Blunder Hills"
            }),
        new AchievementBase(69, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Blunder Hills"
            }),
        new AchievementBase(70, <AchievementModel>{
                "name": "Down by the Desert",
                "qty": 1,
                "desc": "Reach world 2!",
                "rewards": "*STEAM EXCLUSIVE &*18 gems",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(71, <AchievementModel>{
                "name": "Elite Player",
                "qty": 1,
                "desc": "Reach level 60 on any character",
                "rewards": "*STEAM EXCLUSIVE &*16 gems",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(72, <AchievementModel>{
                "name": "Retirement Fund",
                "qty": 1,
                "desc": "Save up 1,000,000 coins, also known as 1 Platinum coin!",
                "rewards": "*STEAM EXCLUSIVE &*15 gems",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(73, <AchievementModel>{
                "name": "More and More Me!",
                "qty": 1,
                "desc": "Create your 4th character, who will never appreciate the struggle your first 3 characters had.",
                "rewards": "*STEAM EXCLUSIVE &*16 gems",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(74, <AchievementModel>{
                "name": "Golden Fly",
                "qty": 1,
                "desc": "Pass through the small golden hoop in the Catching Minigame. It's worth 3 points!",
                "rewards": "**5% Catching &Efficiency",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(75, <AchievementModel>{
                "name": "Hammer Bub",
                "qty": 1,
                "desc": "Level up the 'Hammer Hammer' Alchemy bubble to Lv. 10",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(76, <AchievementModel>{
                "name": "Wassup Yo!",
                "qty": 1,
                "desc": "Say 'Hi' to 100 unique people without closing the game or changing Servers.",
                "rewards": "*2 'Tab 2' Talent Pts &*2% Arcade balls/hr",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(77, <AchievementModel>{
                "name": "Gold School",
                "qty": 1,
                "desc": "Have a stack of exactly 1500 Goldfish in your Storage Chest.",
                "rewards": "*1% Arcade balls/hr",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(78, <AchievementModel>{
                "name": "Buzz Buzz",
                "qty": 1,
                "desc": "Have a stack of exactly 2500 Flies in your Storage Chest.",
                "rewards": "*3 'Tab 2' Talent Pts",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(79, <AchievementModel>{
                "name": "Careful, it's Sharp!",
                "qty": 1,
                "desc": "Have a stack of exactly 15 Glass Shards in your Storage Chest.",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(80, <AchievementModel>{
                "name": "Hybernation",
                "qty": 1,
                "desc": "Leave one of your players AFK for an entire week, which is 168 hours! Anything more counts too!",
                "rewards": "*3% Arcade balls/hr &*Good nights sleep",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(81, <AchievementModel>{
                "name": "Vial Noob",
                "qty": 1,
                "desc": "Get 3 vials to Lv. 4, which are the green ones",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(82, <AchievementModel>{
                "name": "Specializational!",
                "qty": 2,
                "desc": "Choose a subclass for two of your characters.",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(83, <AchievementModel>{
                "name": "Obols Oh Boy!",
                "qty": 1,
                "desc": "Have 10 Silver Obols equipped at once. The Family tab counts here!",
                "rewards": "2% Arcade balls/hr",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(84, <AchievementModel>{
                "name": "Well Learned",
                "qty": 1,
                "desc": "Get a lv 92 or higher Star Book from Alchemy! The 1st one, specifically.",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(85, <AchievementModel>{
                "name": "B-o-B to Help",
                "qty": 1,
                "desc": "Complete 75 unique quests on a single character. I'm not sure what B-o-B stands for either...",
                "rewards": "*STEAM EXCLUSIVE &*16 gems",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(86, <AchievementModel>{
                "name": "Card Enthusiast",
                "qty": 1,
                "desc": "Collect 30 unique cards. If u wanna trade, I got some spare Amarok cards!",
                "rewards": "*STEAM EXCLUSIVE &*16 gems",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(87, <AchievementModel>{
                "name": "Efaunt Trumped",
                "qty": 1,
                "desc": "Defeat Efaunt, the Mummified Elephant God. He will remember you doing this.",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(88, <AchievementModel>{
                "name": "Fishing Finesse",
                "qty": 1,
                "desc": "Get a score of 67+ in the Fishing Minigame, beating the developers highscore!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*2 '4hr time candy'",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(89, <AchievementModel>{
                "name": "Catching Coronation",
                "qty": 1,
                "desc": "Get a score of 128+ in the Catching Minigame, beating the developers highscore!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*4hr time candy",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(90, <AchievementModel>{
                "name": "Crystal Superslam",
                "qty": 1,
                "desc": "Defeat 100 Crystal Mobs. This could go a couple rounds...",
                "rewards": "*STEAM EXCLUSIVE &*20 gems &*2 '2hr time candy'",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(91, <AchievementModel>{
                "name": "Slumbering Gamer",
                "qty": 1,
                "desc": "Claim 2000+ hours of AFK progress across all characters. So lazy!",
                "rewards": "*STEAM EXCLUSIVE &*12 gems &*'12hr time candy'",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(92, <AchievementModel>{
                "name": "My First Trophy!",
                "qty": 1,
                "desc": "Equip any trophy, other than the limited edition ones which don't count lol.",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*'4hr time candy'",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(93, <AchievementModel>{
                "name": "A Fish Too Far",
                "qty": 1000,
                "desc": "Catch a total of 1000 fish across all Fishing Minigame plays.",
                "rewards": "*Beach Background &for Title Screen",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(94, <AchievementModel>{
                "name": "Rat-a-tat-tat",
                "qty": 1,
                "desc": "Level up the 'FMJ' Alchemy bubble to Lv. 30",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(95, <AchievementModel>{
                "name": "Pillars of Sand",
                "qty": 1,
                "desc": "Defeat 250,000 Sandy Pots combined across all characters. Forget the Pillars of Salt though.",
                "rewards": "*Desert Oasis BG &for Title Screen",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(96, <AchievementModel>{
                "name": "Vial Connoisseur",
                "qty": 1,
                "desc": "Get 6 vials to Lv. 7, which are the pink ones",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(97, <AchievementModel>{
                "name": "Coarse Cards",
                "qty": 1,
                "desc": "Level up cards for Mafioso, Sandcastle, Pincermin, and Mashed Potato, all up to 1 star.",
                "rewards": "*Coarse Mountains BG &for Title Screen",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(98, <AchievementModel>{
                "name": "Trial by Time",
                "qty": 1,
                "desc": "Run from Town to Efaunt's Tomb in under 2 minutes, with less than 132% move speed. No teleporting.",
                "rewards": "*2% Arcade balls/hr",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(99, <AchievementModel>{
                "name": "Golden Obolden!",
                "qty": 1,
                "desc": "Have 15 Golden Obols equipped at once. The Family tab counts here!",
                "rewards": "20% Obol Fragments &gained when trashing &obols",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(100, <AchievementModel>{
                "name": "Monocle No More",
                "qty": 1,
                "desc": "Defeat 160 Sand Giants within 10 minutes of entering the map. Auto must be off.",
                "rewards": "*Twilight Desert BG &for Title Screen",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(101, <AchievementModel>{
                "name": "Jellyfish Jelly",
                "qty": 1,
                "desc": "Have a stack of exactly 6000 Jellyfish in your Storage Chest. I heard their Jelly goes good with burgers btw.",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(102, <AchievementModel>{
                "name": "Super Cereal",
                "qty": 1,
                "desc": "Have a stack of exactly 50,000 Sentient Cereal in your Storage Chest.",
                "rewards": "*W2 Colosseum EZ-Access &*W2 Shops EZ-Access",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(103, <AchievementModel>{
                "name": "Sweet Victory",
                "qty": 1,
                "desc": "Get a Score of 200,000 or more in the Sandstone Colosseum",
                "rewards": "*2% Arcade balls/hr",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(104, <AchievementModel>{
                "name": "Ink Blot",
                "qty": 101,
                "desc": "Use 101 silver pens in the Post Office",
                "rewards": "20% chance to keep &silver pens after &using one",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(105, <AchievementModel>{
                "name": "Demon Demolisher",
                "qty": 1,
                "desc": "Defeat the big hourglass and the toilet paper guy!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(106, <AchievementModel>{
                "name": "Dumbo Destroyer",
                "qty": 1,
                "desc": "Defeat Chaotic Efaunt. Look out for the kick, kapow!",
                "rewards": "*STEAM EXCLUSIVE &*35 gems &*2 '2hr time candy'",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(107, <AchievementModel>{
                "name": "Threadin' the Needle",
                "qty": 1,
                "desc": "Pass through the teenie tiny Lava hoop in the Catching Minigame. It only appears if you go through 20 hoops in a row!",
                "rewards": "5% catching EXP for &all characters",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(108, <AchievementModel>{
                "name": "S-M-R-T",
                "qty": 1,
                "desc": "Level up the 'Smarty Boi' Alchemy bubble to Lv. 50",
                "rewards": "-10% Bubble upgrading &costs",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(109, <AchievementModel>{
                "name": "Two Desserts!",
                "qty": 2,
                "desc": "Have the YumYum Sheriff trophy equipped, while also having another in your inventory.",
                "rewards": "5% faster respawn for &YumYum Desert Monsters",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(110, <AchievementModel>{
                "name": "Nuget Nightmare",
                "qty": 1,
                "desc": "Kill Crabbycakes manually, without Auto on, until one drops a Nuget Cake. Good luck...",
                "rewards": "*Nuget Cake Hat Recipe",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(111, <AchievementModel>{
                "name": "Bigtime Bloacher",
                "qty": 1,
                "desc": "Have a stack of exactly 100,000 Bloaches in your Storage Chest.",
                "rewards": "*RNG item unlock",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(112, <AchievementModel>{
                "name": "Vial Junkee",
                "qty": 1,
                "desc": "Get 10 vials to Lv. 9, which are the hyperlight Orange ones. Stop focusing so much on vials, it's not healthy!",
                "rewards": "20% Sigil Charging &Speed",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(113, <AchievementModel>{
                "name": "Fruit Salad",
                "qty": 1,
                "desc": "Have a stack of exactly 1,000,000 Fruit Flies in your Storage Chest.",
                "rewards": "5% catching speed &for all characters",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(114, <AchievementModel>{
                "name": "Your Skin, My Skin",
                "qty": 1,
                "desc": "Wear the Efaunt helmet, Ribcage, Hipillium, and Ankles. Also have 1 Efaunt Obol equipped.",
                "rewards": "*Djonnuttown Teleport",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(115, <AchievementModel>{
                "name": "WAAAAAAAHH!",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Complete all available Treasure Hunts! You can find them on Youtube, just search for it!",
                "rewards": "*3% Arcade balls/hr",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(116, <AchievementModel>{
                "name": "Bobjoepicklejar",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Pickles belong in containers, after all!",
                "rewards": "*1% Arcade balls/hr",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(117, <AchievementModel>{
                "name": "Fish Aint Biting",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ I'm tellin' ya, the fish ain't bitin' today gosh darn it!",
                "rewards": "5% Fishing Exp for &all characters",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(118, <AchievementModel>{
                "name": "Skill Master",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Goldric's bag of peanuts may be nearly empty, but even just one peanut is enough for some...",
                "rewards": "*W2 Boss Key EZ-Access",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(119, <AchievementModel>{
                "name": "Tomb Raider",
                "qty": 1,
                "desc": "Defeat Snakenhotep on his 1st Difficulty.",
                "rewards": "*2% Total DMG for all &characters outside &of dungeons",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(120, <AchievementModel>{
                "name": "Tomb Defiler",
                "qty": 1,
                "desc": "Defeat Snakenhotep on his 2nd Difficulty.",
                "rewards": "*3% Total DMG for all &characters outside &of dungeons",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(121, <AchievementModel>{
                "name": "Tomb Completionist",
                "qty": 1,
                "desc": "Defeat Snakenhotep on his 3rd Difficulty.",
                "rewards": "*5% Total DMG for all &characters outside &of dungeons",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(122, <AchievementModel>{
                "name": "Wazzzzam!",
                "qty": 125,
                "desc": "Wazam 125 rooms in Snakenhotep's Dungeon by performing exceptionally well in a room.",
                "rewards": "*6% Multikill bonus &for all characters",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(123, <AchievementModel>{
                "name": "Just Passing By",
                "qty": 30,
                "desc": "Pass 30 rooms in Snakenhotep's Dungeon by doing the thingy the room says to do.",
                "rewards": "*2% Multikill bonus &for all characters",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(124, <AchievementModel>{
                "name": "Dungeon Slap",
                "qty": 1,
                "desc": "Deal 1000 or more damage in a single hit within any Dungeon.",
                "rewards": "*2% Class EXP bonus &for all characters",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(125, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(126, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(127, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(128, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(129, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(130, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(131, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(132, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(133, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(134, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(135, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(136, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(137, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(138, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(139, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Yum-Yum Desert"
            }),
        new AchievementBase(140, <AchievementModel>{
                "name": "Snowy Wonderland",
                "qty": 1,
                "desc": "Reach World 3, the coolest world in the game!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(141, <AchievementModel>{
                "name": "Veteran Gamer",
                "qty": 1,
                "desc": "Reach level 80 on any character. I'm glad you're enjoying the game, hope you get to Lv. 100!",
                "rewards": "*STEAM EXCLUSIVE &*20 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(142, <AchievementModel>{
                "name": "A Family of Me!",
                "qty": 1,
                "desc": "Create your 8th character, who will never get the love you gave to your earlier characters when making new ones was still special.",
                "rewards": "*STEAM EXCLUSIVE &*25 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(143, <AchievementModel>{
                "name": "Croakin' Froge",
                "qty": 1,
                "desc": "Have a stack of exactly 250 Doge -I mean froge- critters in your Storage Chest.",
                "rewards": "*RNG item unlock",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(144, <AchievementModel>{
                "name": "Sad Souls",
                "qty": 1,
                "desc": "Have a stack of exactly 1,000 Forest Souls in your Storage Chest.",
                "rewards": "*1% Arcade balls/hr",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(145, <AchievementModel>{
                "name": "Checkout Takeout",
                "qty": 1000,
                "desc": "Checkout a total of 1000 talent books from the Talent Book Library",
                "rewards": "*5 Book Max LV &*30% Library charge &rate",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(146, <AchievementModel>{
                "name": "Yawning Cogs",
                "qty": 1,
                "desc": "Have 4 unclaimed Yellow Cogs during any single moment in time, apart from March 16, 2022 at 3.07pm",
                "rewards": "*2% Arcade balls/hr",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(147, <AchievementModel>{
                "name": "Blunder Skull",
                "qty": 1,
                "desc": "Get a Copper Skull or higher on every Blunder Hills monster in the Deathnote.",
                "rewards": "*RNG item unlock",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(148, <AchievementModel>{
                "name": "Too Cute To Live",
                "qty": 1,
                "desc": "You're gonna kill all them lil' poofs? You monster... well, at least make it quick, like 20s or less after entering the map.",
                "rewards": "*5% Total Multikill &on all monsters",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(149, <AchievementModel>{
                "name": "Big Mobs Eek",
                "qty": 5,
                "desc": "Defeat 5 Giant Monsters. Giants only spawn IF you equip the Titan Tachion prayer, unlocked by beating wave 10 of Waka Tower Defence (world 2)",
                "rewards": "*STEAM EXCLUSIVE &*15 gems &*2 '2hr time candy'",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(150, <AchievementModel>{
                "name": "Powdered Neutronium",
                "qty": 1,
                "desc": "Rank up the Explosive Combustion refinery chamber to Rank 2.",
                "rewards": "*STEAM EXCLUSIVE &*15 gems &*3 '2hr time candy'",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(151, <AchievementModel>{
                "name": "Soulslike",
                "qty": 1,
                "desc": "Have 4 Prayers in your Prayer Rock thingy. You get Prayers by placing these wizard dudes into towers and stuff and kickin' butt!",
                "rewards": "*2% Arcade balls/hr",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(152, <AchievementModel>{
                "name": "Good Times Roll",
                "qty": 1,
                "desc": "Beat wave 50 in Glublin Gorefest using ONLY Boulder Roller wizards. No freeze, no confetti, just boulder.",
                "rewards": "*RNG item unlock",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(153, <AchievementModel>{
                "name": "Cog in the System",
                "qty": 1,
                "desc": "Have 20 Grey Cogs placed on the board at once. Not sure why this is an achievement, cogs are boring.",
                "rewards": "*5% Build Speed &in Construction",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(154, <AchievementModel>{
                "name": "I Create...",
                "qty": 1,
                "desc": "Upgrade buildings in construction a total of 50 times. Any buildings, utilities, wizards, shrines, they all count!",
                "rewards": "*1% Arcade balls/hr",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(155, <AchievementModel>{
                "name": "I Sawed...",
                "qty": 1,
                "desc": "Upgrade buildings in construction a total of 250 times.",
                "rewards": "*RNG item unlock",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(156, <AchievementModel>{
                "name": "Hairy Ice Comb",
                "qty": 3000,
                "desc": "Manually loot 1000 floof poofs, melty cubes, and moustache comb stacks -- AFK claiming doesn't count.",
                "rewards": "*Frosty Peaks BG &for Title Screen",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(157, <AchievementModel>{
                "name": "Giant Slayer",
                "qty": 25,
                "desc": "Defeat 5 Giant Mobs of each type Bloque, Mamooth, Snowman, Penguin, & Thermister. Do it in that monster order.",
                "rewards": "*Tundra Outback BG &for Title Screen",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(158, <AchievementModel>{
                "name": "Saharan Skull",
                "qty": 1,
                "desc": "Get a Golden Skull or higher on every YumYum Desert monster in the Deathnote.",
                "rewards": "*1% Printer Sample &Rate",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(159, <AchievementModel>{
                "name": "Fat Souls",
                "qty": 1,
                "desc": "Have a stack of exactly 10,000 Dune Souls in your Storage Chest.",
                "rewards": "*Start with 15 &more points in Worship &Tower Defence",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(160, <AchievementModel>{
                "name": "Borrowed Pens",
                "qty": 1,
                "desc": "Remember all those pens you lent out in school and never got back? You've got 13 seconds to vent your anger on every penguin mob!",
                "rewards": "*3% Arcade balls/hr",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(161, <AchievementModel>{
                "name": "Large Fortune",
                "qty": 1,
                "desc": "Save up 100,000,000 coins. But remember, as far as the idleon government knows, none of those coins came from a taxable income wink wink.",
                "rewards": "*STEAM EXCLUSIVE &*25 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(162, <AchievementModel>{
                "name": "Sqeakin' Mousey",
                "qty": 1,
                "desc": "Have a stack of exactly 60,000 Mouseys in your Storage Chest. Imagine the noise in that chest of yours... or even the smell, ugh.",
                "rewards": "*Hunters Grove BG &for Title Screen",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(163, <AchievementModel>{
                "name": "Geared for Success",
                "qty": 1,
                "desc": "Have 40 Yellow Cogs placed on the board at once. Alright now I see how this is achievement worthy, cogs are kinda neat.",
                "rewards": "*5% Construction EXP &gain",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(164, <AchievementModel>{
                "name": "Guild Higher-Up",
                "qty": 1,
                "desc": "Contribute 3,000 GP to your guild, putting you above the other guild members who only have the 500 GP Achievment!",
                "rewards": "*STEAM EXCLUSIVE &*22 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(165, <AchievementModel>{
                "name": "Legendary Gamer",
                "qty": 1,
                "desc": "Reach level 100 on any character! Just 4 more digits and you'd have a phone number!",
                "rewards": "*STEAM EXCLUSIVE &*23 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(166, <AchievementModel>{
                "name": "Entangled Compounds",
                "qty": 1,
                "desc": "Rank up the Spontaneous Combustion refinery chamber to Rank 3.",
                "rewards": "*5 'Tab 3' Talent Pts",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(167, <AchievementModel>{
                "name": "There Can Be Only 1",
                "qty": 1,
                "desc": "Beat wave 50 of Wakawaka War without using more than 1 of any specific tower. Can't have 2 pulsers, or 2 frozones!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*3 '12hr time candy'",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(168, <AchievementModel>{
                "name": "Blurple Skull",
                "qty": 1,
                "desc": "Get a Dementia Skull or higher on every Frostbite Tundra monster in the Deathnote.",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*5 '72hr time candy'",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(169, <AchievementModel>{
                "name": "Souped Up Salts",
                "qty": 1,
                "desc": "Rank up the Redox Combustion refinery chamber to Rank 10.",
                "rewards": "*RNG item unlock",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(170, <AchievementModel>{
                "name": "I Constructed!",
                "qty": 1,
                "desc": "Upgrade buildings in construction a total of 900 times.",
                "rewards": "*10 'Tab 3' Talent Pts",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(171, <AchievementModel>{
                "name": "Cogs Be Waitin'",
                "qty": 1,
                "desc": "Have 16 unclaimed Grey Cogs at once. Jeez, I'm glad anthropomorphic cogs aren't real.",
                "rewards": "*4% Arcade balls/hr",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(172, <AchievementModel>{
                "name": "Simpin' for NPC's",
                "qty": 1,
                "desc": "Complete 150 unique quests on a single character. Apparently people find 'simp' offensive, and I'm kinda offended by that...",
                "rewards": "*STEAM EXCLUSIVE &*24 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(173, <AchievementModel>{
                "name": "Top Cogs",
                "qty": 1,
                "desc": "78 Cogs. All purple cogs. Did I say cogs are great? I think cogs are great. Cog cog cog!",
                "rewards": "*W3 Boss Key EZ-Access",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(174, <AchievementModel>{
                "name": "Card Dude",
                "qty": 1,
                "desc": "Collect 120 unique cards. Not sure why something as mundane as 'dude' is the descriptor here, don't read too much into it.",
                "rewards": "*STEAM EXCLUSIVE &*24 gems",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(175, <AchievementModel>{
                "name": "Crystal Champ",
                "qty": 1,
                "desc": "Defeat 2000 crystal mobs. You must've watched a whole lotta Dev Streams to get this!",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*12hr time candy",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(176, <AchievementModel>{
                "name": "Smirky Souls",
                "qty": 1,
                "desc": "Have a stack of exactly 250,000 Rooted Souls in your Storage Chest.",
                "rewards": "*RNG item unlock",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(177, <AchievementModel>{
                "name": "Comatosed Gamer",
                "qty": 1,
                "desc": "Claim 30,000+ Hrs of AFK gains. Thats two years, woah!",
                "rewards": "*STEAM EXCLUSIVE &*25 gems &*24hr time candy",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(178, <AchievementModel>{
                "name": "Knock on Wood",
                "qty": 1,
                "desc": "Beat wave 50 of Acorn Assault with just 4 towers active. Place down a 5th tower at any time, and it wont count!",
                "rewards": "*3% Arcade balls/hr",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(179, <AchievementModel>{
                "name": "The Goose is Loose",
                "qty": 1,
                "desc": "Have a HONK of exactly 1,000,000 Honkers in your HONK Chest. HONKHONKHONK HOOOONK!!!",
                "rewards": "*HONK Hat Recipe",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(180, <AchievementModel>{
                "name": "Sepia Vision",
                "qty": 1,
                "desc": "Have a stack of exactly 500 Black Lenses in your Storage Chest. Better complete this before I make it 1,000!",
                "rewards": "*Crystal Caverns BG &for Title Screen",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(181, <AchievementModel>{
                "name": "Rattle them Bones",
                "qty": 1,
                "desc": "Defeat every Bloodbone in just 12 seconds after entering the map. Wow, wild.",
                "rewards": "*Pristalle Lake BG &for Title Screen",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(182, <AchievementModel>{
                "name": "A Most Nice Sale",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ You SOLD gems to the World 3 town store...? All at once? How many...? Nice.",
                "rewards": "*STEAM EXCLUSIVE &*1 gem &*1 '24hr time candy'",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(183, <AchievementModel>{
                "name": "Cool Score!",
                "qty": 1,
                "desc": "Get a Score of 2",
                "rewards": "500,000 or more in the Chillsnap Colosseum",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(184, <AchievementModel>{
                "name": "Dungeon Wallop",
                "qty": 1,
                "desc": "Deal 25000 or more damage in a single hit within any Dungeon.",
                "rewards": "*4% Crit Chance Bonus &for all characters &outside of dungeon",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(185, <AchievementModel>{
                "name": "Boss Defeated",
                "qty": 1,
                "desc": "Defeat Glaciaxus on its 1st difficulty",
                "rewards": "*2% Total DMG for all &characters outside &of dungeons",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(186, <AchievementModel>{
                "name": "Manager Defeated",
                "qty": 1,
                "desc": "Defeat Glaciaxus on its 2nd difficulty",
                "rewards": "*3% Total DMG for all &characters outside &of dungeons",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(187, <AchievementModel>{
                "name": "Kingpin Defeated",
                "qty": 1,
                "desc": "Defeat Glaciaxus on its 3rd difficulty",
                "rewards": "*5% Total DMG for all &characters outside &of dungeons",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(188, <AchievementModel>{
                "name": "Capitalist Win",
                "qty": 1000,
                "desc": "Complete 1000 jobs within the Glacial Basement dungeon.",
                "rewards": "*5% Class EXP for all &characters outside &of dungeons",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(189, <AchievementModel>{
                "name": "Equinox Visitor",
                "qty": 1,
                "desc": "Find the Equinox Mirror drop from Bloodbones, a 1 in 1000 drop, and use it to visit the Equinox Valley.",
                "rewards": "*4% Total DMG for all &characters",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(190, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(191, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(192, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(193, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(194, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(195, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(196, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(197, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(198, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(199, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(200, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(201, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(202, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(203, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(204, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(205, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(206, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(207, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(208, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(209, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*Item3",
                "world": "Frostbite Tundra"
            }),
        new AchievementBase(210, <AchievementModel>{
                "name": "Milky Wayfarer",
                "qty": 1,
                "desc": "Reach World 4, the purple one with outer space stuff!",
                "rewards": "*STEAM EXCLUSIVE &*RNG item unlock &*Some Gems and Candy",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(211, <AchievementModel>{
                "name": "Channel Surfing",
                "qty": 1,
                "desc": "Have a stack of exactly 75,000 TV remotes in your Storage Chest.",
                "rewards": "*Nebula BG &for Title Screen",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(212, <AchievementModel>{
                "name": "Bottle Capital",
                "qty": 1,
                "desc": "Have a stack of exactly 800,000 Bottle Caps in your Storage Chest.",
                "rewards": "*10 Star Tab &Talent Pts",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(213, <AchievementModel>{
                "name": "Too Many Tentacles",
                "qty": 1,
                "desc": "Have a stack of exactly 10,000,000 Wriggly Balls in your Storage Chest. Green Stack bro!",
                "rewards": "*3% Arcade balls/hr",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(214, <AchievementModel>{
                "name": "Mythical Gamer",
                "qty": 1,
                "desc": "Reach level 125 on any character! This used to be a HUGE deal, now it's just a big deal.",
                "rewards": "*STEAM EXCLUSIVE &*30 gems",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(215, <AchievementModel>{
                "name": "Matrix Wickermen",
                "qty": 8760,
                "desc": "Accumulate 8760 hours, or an entire year, of Lab AFK time across all players.",
                "rewards": "*RNG item unlock",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(216, <AchievementModel>{
                "name": "Bland Dish",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ What exactly were you expecting to cook, an invisible meal?",
                "rewards": "6 Tab 1 &Talent Pts",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(217, <AchievementModel>{
                "name": "Lv. 5 Nothing",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Ah, I see you enjoy reading upgrade flavor text as well!",
                "rewards": "*STEAM EXCLUSIVE &*30 gems &*2 '12hr time candy'",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(218, <AchievementModel>{
                "name": "I Like This Pet",
                "qty": 1,
                "desc": "Get a Breedability III heart on at least 2 Pets within the nest.",
                "rewards": "Pet Breedability &multiplier goes up &1.20x faster",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(219, <AchievementModel>{
                "name": "I LOVE These Pets",
                "qty": 1,
                "desc": "Get a Breedability VII heart on at least 15 pets within the nest.",
                "rewards": "10 Tab 3 &Talent Pts",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(220, <AchievementModel>{
                "name": "Shiny Shells",
                "qty": 1,
                "desc": "Have 6 bronze (or rarer) eggs in your nest at the same time, waiting to be hatched!",
                "rewards": "10% Faster Egg &Incubator Speed",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(221, <AchievementModel>{
                "name": "Gilded Shells",
                "qty": 1,
                "desc": "Have 12 gold (or rarer) eggs in your nest at the same time, waiting to be hatched!",
                "rewards": "Eggs increase in &rarity 1.10x more &often",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(222, <AchievementModel>{
                "name": "Barley Lost",
                "qty": 1,
                "desc": "Fail a pet battle with the enemy team having only 5% HP or less. Wait, it's spelled HOW???",
                "rewards": "5% Pet Fight &Damage",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(223, <AchievementModel>{
                "name": "Petless",
                "qty": 1,
                "desc": "Trash a total of 2500 pets. How could you be so heartless, so cold...",
                "rewards": "*STEAM EXCLUSIVE &*50 gems &*1 '72hr time candy'",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(224, <AchievementModel>{
                "name": "Cabbage Patch",
                "qty": 1,
                "desc": "Have 5 kitchens all cooking cabbages at the same time. Remember gamers, eat your vegetables, they ain't so bad!",
                "rewards": "10% Meal Cooking &Speed",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(225, <AchievementModel>{
                "name": "Le Pretzel Bleu",
                "qty": 1,
                "desc": "Have 8 kitchens all cooking Pretzels at the same time. Don't get it twisted, them pretzels are the real deal.",
                "rewards": "20% Meal Cooking &Speed",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(226, <AchievementModel>{
                "name": "Michelin Ranked",
                "qty": 1,
                "desc": "Upgrade any kitchen stat to Lv. 300, giving you an elite crown over the upgrade bars, thus resulting in dopamine.",
                "rewards": "*RNG item unlock",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(227, <AchievementModel>{
                "name": "WOAH That's Fast",
                "qty": 1,
                "desc": "Have a speed of 'Too Fast' displayed while cooking an Eggplant. No this is not a metaphor.",
                "rewards": "*2% Arcade balls/hr",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(228, <AchievementModel>{
                "name": "Stars Among Stars",
                "qty": 1,
                "desc": "Complete all constellations in the Hyperion Nebula. Thats what world 4 is called btw.",
                "rewards": "*Eternity Beach BG &for Title Screen",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(229, <AchievementModel>{
                "name": "Chippin' Away",
                "qty": 25,
                "desc": "Claim 25 chips from the Chip Repository. I was gonna make this 250 chips, but people from the future told me not to.",
                "rewards": "*2% Arcade balls/hr",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(230, <AchievementModel>{
                "name": "Hunned Times a Day",
                "qty": 10000,
                "desc": "Claim spices by any means 10,000 times. Like, individual claims.",
                "rewards": "8 Tab 2 &Talent Pts",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(231, <AchievementModel>{
                "name": "Good Plate",
                "qty": 1,
                "desc": "Upgrade a meal at the Dinner Menu to the point where it gets a diamond plate!",
                "rewards": "*RNG item unlock &*W4 Shops EZ-Access",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(232, <AchievementModel>{
                "name": "Great Plate",
                "qty": 1,
                "desc": "Upgrade a meal at the Dinner Menu to the point where it gets a purple plate!",
                "rewards": "*2% Arcade balls/hr",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(233, <AchievementModel>{
                "name": "Best Plate",
                "qty": 1,
                "desc": "Upgrade a meal at the Dinner Menu to the point where it gets a void pearl plate!",
                "rewards": "-10% lower cost &to upgrade meals &at the Dinner Table",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(234, <AchievementModel>{
                "name": "Space Party!!!",
                "qty": 1,
                "desc": "Dance with at least 5 other people while you're all in World 4 town!",
                "rewards": "*2% Arcade balls/hr",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(235, <AchievementModel>{
                "name": "Zero G Scorin'",
                "qty": 1,
                "desc": "Get a Score of 10,000,000 or more in the Astro Colosseum",
                "rewards": "5% Cash from &Monsters",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(236, <AchievementModel>{
                "name": "Hibernating Gamer",
                "qty": 1,
                "desc": "Glaim 110,000 hours of AFK time. Jeez, thats like an entire year of all characters idling to the max.",
                "rewards": "*STEAM EXCLUSIVE &*100 gems &*1 '72hr time candy'",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(237, <AchievementModel>{
                "name": "Mutant Massacrer",
                "qty": 1,
                "desc": "Defeat both Mutant Minibosses, the W3 Slush and W4 Mush. You must defeat Slush before Mush, in that order.",
                "rewards": "*STEAM EXCLUSIVE &*RNG item unlock &*Some Gems and Candy",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(238, <AchievementModel>{
                "name": "Soda Poisoning",
                "qty": 1,
                "desc": "Beat wave 50 of Clash of Cans with 3 Poisonic Elders at Lv 5 or higher. Also, you can't sell towers.",
                "rewards": "*Starfield Belt BG &for Title Screen",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(239, <AchievementModel>{
                "name": "The True King",
                "qty": 1000000,
                "desc": "Reach a total of 1 million Orb Kills.",
                "rewards": "10 Tab 4 Talent Pts",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(240, <AchievementModel>{
                "name": "The True Pirate",
                "qty": 1000000,
                "desc": "Reach a total of 1 million Plunderous Kills. This one is the true challenge of the three.",
                "rewards": "15 Tab 4 Talent Pts &1% Total Dmg",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(241, <AchievementModel>{
                "name": "The True Emperor",
                "qty": 1000000,
                "desc": "Reach a total of 1 million Wormhole Kills.",
                "rewards": "12 Tab 4 Talent Pts",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(242, <AchievementModel>{
                "name": "Veritable Master",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Destruction comes to all who cross your path, no matter how many times you cross paths.",
                "rewards": "1 Void Talent Pt",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(243, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(244, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(245, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(246, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(247, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(248, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(249, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(250, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(251, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(252, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(253, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(254, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(255, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(256, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(257, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(258, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(259, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(260, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(261, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(262, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(263, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(264, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(265, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(266, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(267, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(268, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(269, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(270, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(271, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(272, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(273, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(274, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(275, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(276, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(277, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(278, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(279, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Hyperion Nebula"
            }),
        new AchievementBase(280, <AchievementModel>{
                "name": "Maple Logger",
                "qty": 1,
                "desc": "Have a stack of exactly 200,000 Maple Logs in your Storage Chest.",
                "rewards": "1% Damage for all &characters",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(281, <AchievementModel>{
                "name": "Vitamin D-licious",
                "qty": 1,
                "desc": "Have a stack of exactly 5,000,000 Orange Slices in your Storage Chest.",
                "rewards": "50% Forge Ore &Capacity",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(282, <AchievementModel>{
                "name": "Wurm Wumbo",
                "qty": 1,
                "desc": "Have a stack of exactly 100,000,000 Mongo Worm Slices in your Storage Chest.",
                "rewards": "*Wurm Catacombs BG",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(283, <AchievementModel>{
                "name": "Supernatural Gamer",
                "qty": 1,
                "desc": "Reach level 300 on any character! My oh my! This would have been inconceivable just a few years ago!",
                "rewards": "10% All Skill EXP",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(284, <AchievementModel>{
                "name": "Smokin' Stars",
                "qty": 1,
                "desc": "Complete all constellations in the Smolderin' Plateau. You can check you progress within the Telescope.",
                "rewards": "20% All Skill EXP",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(285, <AchievementModel>{
                "name": "The Plateauourist",
                "qty": 1,
                "desc": "Reach World 5, a personal favorite world of mine! Look, I like lava what can I say.",
                "rewards": "4 Daily Crystal Mob &Spawn Guarantee",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(286, <AchievementModel>{
                "name": "No Krakens? ):",
                "qty": 1,
                "desc": "Reach Wave 50 of Citric Conflict tower defence without placing a single Kraken Towers. Not even one.",
                "rewards": "25% Class EXP",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(287, <AchievementModel>{
                "name": "Artifact Finder",
                "qty": 1,
                "desc": "Collect 15 Artifacts from Sailing",
                "rewards": "*1 Extra Chest Slot in &Sailing Loot Pile",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(288, <AchievementModel>{
                "name": "Artifact Enjoyer",
                "qty": 1,
                "desc": "Collect all 30 Artifacts from Sailing",
                "rewards": "*Magma Rivertown BG",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(289, <AchievementModel>{
                "name": "Artifact Jones",
                "qty": 1,
                "desc": "Collect all 30 ANCIENT Artifacts from Sailing. All that glitters is not gold, but it sure is shiny!",
                "rewards": "20 Star Talent Pts",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(290, <AchievementModel>{
                "name": "Gilded Vessel",
                "qty": 1,
                "desc": "Upgrade a boat to Lv 100 in Sailing. It'll turn gold to reflect its power!",
                "rewards": "*1 Extra Chest Slot in &Sailing Loot Pile",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(291, <AchievementModel>{
                "name": "Maroon Warship",
                "qty": 1,
                "desc": "Upgrade a boat to Lv 300 in Sailing. This is the pinnacle of naval prowess, it doesn't get fancier than this!",
                "rewards": "1 Lv to all Talents &for all characters",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(292, <AchievementModel>{
                "name": "Glory To Nobisect",
                "qty": 1,
                "desc": "Unlock the 3rd Divinity God.",
                "rewards": "10 'Tab 4' Talent Pts",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(293, <AchievementModel>{
                "name": "All Hail Purrmep",
                "qty": 1,
                "desc": "Unlock the 7th Divinity God.",
                "rewards": "10 Alternate Particle &Alchemy Upgrades Per &Day",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(294, <AchievementModel>{
                "name": "Long Live Bagur",
                "qty": 1,
                "desc": "Unlock the 10th and final Divinity God.",
                "rewards": "10% All Skill EXP",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(295, <AchievementModel>{
                "name": "POiNG Champion",
                "qty": 1,
                "desc": "Get a POiNG score of 25,000 or more! My personal highscore is 38",
                "rewards": "323 at the time of coding this!",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(296, <AchievementModel>{
                "name": "Lucky Harvest",
                "qty": 1,
                "desc": "Harvest a plant with a Bit worth who's first 3 digits are 777. For example, 77.7K Bits would count, or 777M Bits too!",
                "rewards": "*1.05x Bit Gain in &Gaming",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(297, <AchievementModel>{
                "name": "Chemical Collector",
                "qty": 1000,
                "desc": "Harvest a total of 1000 Chemical-type Plants in Gaming.",
                "rewards": "3% Damage for all &characters",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(298, <AchievementModel>{
                "name": "Voraci Vantasia",
                "qty": 500,
                "desc": "Harvest a total of 500 Voraci-type Plants in Gaming.",
                "rewards": "10% Divinity Points &Gained",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(299, <AchievementModel>{
                "name": "Bonsai Bonanza",
                "qty": 100,
                "desc": "Harvest a total of 100 Bonsai-type Plants in Gaming.",
                "rewards": "*W5 Shop EZ-Access",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(300, <AchievementModel>{
                "name": "Perfect Trade Deal",
                "qty": 1,
                "desc": "Make a trade with Blobby G worth a gold bar amount that starts with 777, like 777K or 7.77M for example. PS 776 and 778 work too lol",
                "rewards": "1 additional Treasure &Per Chest for Sailing",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(301, <AchievementModel>{
                "name": "True Naval Captain",
                "qty": 1,
                "desc": "Buy all 20 Boats in Sailing. Uh, yea, there is a scroll bar below the boats, you can buy more than 5 boats #",
                "rewards": "20% Captain EXP &for sailing",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(302, <AchievementModel>{
                "name": "Legendary Orb",
                "qty": 1,
                "desc": "On your Divine Knight, get an Orb Score of 400 or more on OJ Bay. This is the number above your Orb!",
                "rewards": "*Smoggy Basin BG",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(303, <AchievementModel>{
                "name": "Legendary Flag",
                "qty": 1,
                "desc": "On your Siege Breaker, get a Flag Score of 150 or more on Erruption River. This is the number above your Flag!",
                "rewards": "2% Damage for all &characters",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(304, <AchievementModel>{
                "name": "Legendary Wormhole",
                "qty": 1,
                "desc": "On your Elemental Sorcerer, get a Wormhole Score of 83 or more on Niagrilled Falls. This is the number above your Wormhole!",
                "rewards": "10% Divinity Points &Gained",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(305, <AchievementModel>{
                "name": "Utter DISRESPECT",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Why did you even hire the poor fella in the first place???",
                "rewards": "20 Star Talent Pts",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(306, <AchievementModel>{
                "name": "Sneaky Stealing",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ Walk to a uh... weird location? Well it's not that weird, but it's just like, what ya doin' back there?",
                "rewards": "25% Shop Capacity &for all Town Shops",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(307, <AchievementModel>{
                "name": "Broken Controller",
                "qty": 1,
                "desc": "SECRET ACHIEVEMENT ------------------------ You got... zero? Literally zero?? Jeez, Im sorry but I think you need to uninstall ^",
                "rewards": "*1.05x Bit Gain in &Gaming",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(308, <AchievementModel>{
                "name": "Lavathian Skulls",
                "qty": 1,
                "desc": "Get a Lava Skull or higher on every Smolderin' Plateau monster in the Deathnote. Yea, the 100M Kill Skull. This is gonna take a while.",
                "rewards": "2% Faster Monster &Respawn Time for &All World 5 mobs",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(309, <AchievementModel>{
                "name": "Seaworthy Captain",
                "qty": 1,
                "desc": "Level up a Sailing Captain to Lv 15. Few captains in the universe can rival their ability to plunder!",
                "rewards": "1% ALL STAT for &all characters",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(310, <AchievementModel>{
                "name": "Grand Captain",
                "qty": 1,
                "desc": "Level up a Sailing Captain to Lv 10. They shall sail the seas with confidence!",
                "rewards": "20% Captain EXP &for sailing",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(311, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(312, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(313, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(314, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(315, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(316, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(317, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(318, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(319, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(320, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(321, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(322, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(323, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(324, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(325, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(326, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(327, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(328, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(329, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(330, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(331, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(332, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(333, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(334, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(335, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(336, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(337, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(338, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(339, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(340, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(341, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(342, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(343, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(344, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(345, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(346, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(347, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(348, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            }),
        new AchievementBase(349, <AchievementModel>{
                "name": "FILLERZZZ ACH",
                "qty": 20,
                "desc": "-",
                "rewards": "*FILLERZ &*FILLERZ &*FILLERZ",
                "world": "Smolderin' Plateau"
            })    
]
}
