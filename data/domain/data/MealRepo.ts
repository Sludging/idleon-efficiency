import { MealModel } from '../model/mealModel';

export class MealBase { constructor(public index: number, public data: MealModel) { } }



export const initMealRepo = () => {
    return [    
        new MealBase(0, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 10,
                "bonusQty": 2,
                "bonusText": "+{% Total Damage",
                "description": "Do I smell gratitude? Oh, no that's colonialization...",
                "bonusKey": "TotDmg"
            }),
        new MealBase(1, <MealModel>{
                "name": "Egg",
                "cookingReq": 15,
                "bonusQty": 5,
                "bonusText": "+{% Meal Cooking Speed",
                "description": "It's just an egg.",
                "bonusKey": "Mcook"
            }),
        new MealBase(2, <MealModel>{
                "name": "Salad",
                "cookingReq": 25,
                "bonusQty": 3,
                "bonusText": "+{% Cash from Monsters",
                "description": "Yea uhm, could I get a burger, but hold the meat and buns?",
                "bonusKey": "Cash"
            }),
        new MealBase(3, <MealModel>{
                "name": "Pie",
                "cookingReq": 40,
                "bonusQty": 5,
                "bonusText": "+{% New Recipe Cooking Speed",
                "description": "Cartoon characters with a fear of levitation HATE the smell of this!",
                "bonusKey": "Rcook"
            }),
        new MealBase(4, <MealModel>{
                "name": "Frenk Fries",
                "cookingReq": 60,
                "bonusQty": 5,
                "bonusText": "+{% New Pet Breeding Odds",
                "description": "You're breeding pets in outer space, don't be shocked that there's no France!",
                "bonusKey": "Npet"
            }),
        new MealBase(5, <MealModel>{
                "name": "Spaghetti",
                "cookingReq": 90,
                "bonusQty": 4,
                "bonusText": "+{% Breeding EXP",
                "description": "Your mom made this. It's her spaghetti.",
                "bonusKey": "BrExp"
            }),
        new MealBase(6, <MealModel>{
                "name": "Corn",
                "cookingReq": 125,
                "bonusQty": 2,
                "bonusText": "+{% Skill Efficiency",
                "description": "To think the government is subsidizing this... its bonus is terrible!!!",
                "bonusKey": "Seff"
            }),
        new MealBase(7, <MealModel>{
                "name": "Garlic Bread",
                "cookingReq": 175,
                "bonusQty": 4,
                "bonusText": "+{% VIP Library Membership",
                "description": "The letter H ain't lookin' so good after eating a few of these...",
                "bonusKey": "VIP"
            }),
        new MealBase(8, <MealModel>{
                "name": "Garlicless Bread",
                "cookingReq": 250,
                "bonusQty": 2,
                "bonusText": "+{% Lab EXP",
                "description": "Many revolutions in the world originate from an increase in the price of bread",
                "bonusKey": "Lexp"
            }),
        new MealBase(9, <MealModel>{
                "name": "Pizza",
                "cookingReq": 350,
                "bonusQty": 9,
                "bonusText": "+{% New Pet Breeding Odds",
                "description": "Mama mia mahhh piiiiiiiizzza!!! Wait I already did that joke, replace this one",
                "bonusKey": "Npet"
            }),
        new MealBase(10, <MealModel>{
                "name": "Apple",
                "cookingReq": 500,
                "bonusQty": 5,
                "bonusText": "+{ Base DEF",
                "description": "Aw jeez Richard, I sure am hungry for apples!",
                "bonusKey": "Def"
            }),
        new MealBase(11, <MealModel>{
                "name": "Pancakes",
                "cookingReq": 700,
                "bonusQty": 2,
                "bonusText": "+{Px Line Width in Lab Mainframe",
                "description": "Ohhh, they're called 'pan'cakes because they're like cakes made in a pan haha",
                "bonusKey": "PxLine"
            }),
        new MealBase(12, <MealModel>{
                "name": "Corndog",
                "cookingReq": 1000,
                "bonusQty": 12,
                "bonusText": "+{% Meal Cooking Speed",
                "description": "Ohhh, they're called 'corn'dogs because... wait, why are they called corndogs?",
                "bonusKey": "Mcook"
            }),
        new MealBase(13, <MealModel>{
                "name": "Cabbage",
                "cookingReq": 1400,
                "bonusQty": 5,
                "bonusText": "+{% All Cooking Spd per 10 upgrade Lvs",
                "description": "This is a MONUMENTALLY IMPORTANT vegetable, as well as upgrade.",
                "bonusKey": "KitchenEff"
            }),
        new MealBase(14, <MealModel>{
                "name": "Potato Pea Pastry",
                "cookingReq": 2000,
                "bonusQty": 1,
                "bonusText": "+{% Lower Egg Incubator Time",
                "description": "Yuhhhh it's that Triple P threat! Look out for them P's bro!",
                "bonusKey": "TimeEgg"
            }),
        new MealBase(15, <MealModel>{
                "name": "Dango",
                "cookingReq": 3000,
                "bonusQty": 2,
                "bonusText": "+{% Lower Kitchen Upgrade Costs",
                "description": "Look, I'm not sure what these are either, just go with it.",
                "bonusKey": "KitchC"
            }),
        new MealBase(16, <MealModel>{
                "name": "Sourish Fish",
                "cookingReq": 4000,
                "bonusQty": 4,
                "bonusText": "+{% VIP Library Membership",
                "description": "Shhh stop saying they're sweet, you're gonna get me in trouble!",
                "bonusKey": "VIP"
            }),
        new MealBase(17, <MealModel>{
                "name": "Octoplop",
                "cookingReq": 5000,
                "bonusQty": 2,
                "bonusText": "+{% Total Damage",
                "description": "They really did just plop an octopus on a plate and call it a day.",
                "bonusKey": "TotDmg"
            }),
        new MealBase(18, <MealModel>{
                "name": "Croissant",
                "cookingReq": 8000,
                "bonusQty": 1,
                "bonusText": "+{% Pet Fighting Damage",
                "description": "Carl loves these!",
                "bonusKey": "PetDmg"
            }),
        new MealBase(19, <MealModel>{
                "name": "Canopy",
                "cookingReq": 12500,
                "bonusQty": 10,
                "bonusText": "+{% New Recipe Cooking Speed",
                "description": "...oh, you said 'Can of Pea's. You know, that does make a lot more sense.",
                "bonusKey": "Rcook"
            }),
        new MealBase(20, <MealModel>{
                "name": "Cannoli",
                "cookingReq": 20000,
                "bonusQty": 1,
                "bonusText": "+{% Points earned in Tower Defence",
                "description": "Ain't got no joke for this one, it's existence is enough of a joke.",
                "bonusKey": "TDpts"
            }),
        new MealBase(21, <MealModel>{
                "name": "Cheese",
                "cookingReq": 35000,
                "bonusQty": 5,
                "bonusText": "+{% Cooking EXP",
                "description": "Sourced organically, straight from the moon!",
                "bonusKey": "CookExp"
            }),
        new MealBase(22, <MealModel>{
                "name": "Sawdust",
                "cookingReq": 50000,
                "bonusQty": 5,
                "bonusText": "+{% Lab EXP",
                "description": "'Id rather starve than eat that' - Angie, 2021",
                "bonusKey": "Lexp"
            }),
        new MealBase(23, <MealModel>{
                "name": "Eggplant",
                "cookingReq": 75000,
                "bonusQty": 5,
                "bonusText": "+{% Pet Breedability Speed in Fenceyard",
                "description": "Idk what you Zoomers are up to with those eggplant emojis, but I don't like it...",
                "bonusKey": "Breed"
            }),
        new MealBase(24, <MealModel>{
                "name": "Cheesy Bread",
                "cookingReq": 110000,
                "bonusQty": 1,
                "bonusText": "+{% Total Accuracy",
                "description": "Another bread meal? Wow so unoriginal, I'm glad I already left a 1 star rating.",
                "bonusKey": "TotAcc"
            }),
        new MealBase(25, <MealModel>{
                "name": "Wild Boar",
                "cookingReq": 200000,
                "bonusQty": 2,
                "bonusText": "+{Px Line Width in Lab Mainframe",
                "description": "It's not really wild anymore is it, it looks kinda dead and roasted.",
                "bonusKey": "PxLine"
            }),
        new MealBase(26, <MealModel>{
                "name": "Donut",
                "cookingReq": 300000,
                "bonusQty": 15,
                "bonusText": "+{% New Pet Breeding Odds",
                "description": "Mmmmm... doooooooonut...",
                "bonusKey": "Npet"
            }),
        new MealBase(27, <MealModel>{
                "name": "Riceball",
                "cookingReq": 500000,
                "bonusQty": 3,
                "bonusText": "+{% Skill Efficiency",
                "description": "Dude it's just a ball of rice, like what do you want me to say about it?",
                "bonusKey": "Seff"
            }),
        new MealBase(28, <MealModel>{
                "name": "Cauliflower",
                "cookingReq": 750000,
                "bonusQty": 1,
                "bonusText": "+{% Basic Atk Speed",
                "description": "The white part is called Curd. Welp, time to recategorize this as an educational game!",
                "bonusKey": "AtkSpd"
            }),
        new MealBase(29, <MealModel>{
                "name": "Durian Fruit",
                "cookingReq": 1000000,
                "bonusQty": 6,
                "bonusText": "+{% Lower Kitchen Upgrade costs",
                "description": "This must have been in the room when Kurt said it smelled like 'teen spirit'...",
                "bonusKey": "KitchC"
            }),
        new MealBase(30, <MealModel>{
                "name": "Orange",
                "cookingReq": 1500000,
                "bonusQty": 3,
                "bonusText": "+{% VIP Library Membership",
                "description": "The true arch-nemesis of rappers and poets alike.",
                "bonusKey": "VIP"
            }),
        new MealBase(31, <MealModel>{
                "name": "Bunt Cake",
                "cookingReq": 3000000,
                "bonusQty": 7,
                "bonusText": "+{% Cash from Monsters",
                "description": "Bunt cake more like Punt cake because I'm kicking this trash straight to the garbage.",
                "bonusKey": "Cash"
            }),
        new MealBase(32, <MealModel>{
                "name": "Chocolate Truffle",
                "cookingReq": 5000000,
                "bonusQty": 25,
                "bonusText": "+{% New Pet Breeding Odds",
                "description": "I mean it's got a bite taken out of it, pretty gross.",
                "bonusKey": "Npet"
            }),
        new MealBase(33, <MealModel>{
                "name": "Leek",
                "cookingReq": 8000000,
                "bonusQty": 2,
                "bonusText": "+{% skilling prowess",
                "description": "Prowess lowers the efficiency needed when efficiency bar is orange in AFK info",
                "bonusKey": "Sprow"
            }),
        new MealBase(34, <MealModel>{
                "name": "Fortune Cookie",
                "cookingReq": 12000000,
                "bonusQty": 4,
                "bonusText": "+{% Faster Library checkout Speed",
                "description": "It reads: 'Salvation lies not within enjoying video games, but from gitting gud at them'",
                "bonusKey": "Lib"
            }),
        new MealBase(35, <MealModel>{
                "name": "Pretzel",
                "cookingReq": 20000000,
                "bonusQty": 7,
                "bonusText": "+{% Lab EXP",
                "description": "I love pretzels, people really be sleepin' on the versatility they bring to the table!",
                "bonusKey": "Lexp"
            }),
        new MealBase(36, <MealModel>{
                "name": "Sea Urchin",
                "cookingReq": 30000000,
                "bonusQty": 1,
                "bonusText": "+{% Critters from traps",
                "description": "At least one person reading this has eating one of these. Oh, it's you? Good for you.",
                "bonusKey": "Critter"
            }),
        new MealBase(37, <MealModel>{
                "name": "Mashed Potato",
                "cookingReq": 40000000,
                "bonusQty": 6,
                "bonusText": "+{% Cooking EXP",
                "description": "This nutritious meal reminds me of the Mashed Potato monster from IdleOn, the video game!",
                "bonusKey": "CookExp"
            }),
        new MealBase(38, <MealModel>{
                "name": "Mutton",
                "cookingReq": 90000000,
                "bonusQty": 1,
                "bonusText": "+{% Crit Chance",
                "description": "Yeap I tell you hwat Bobby, this is a real man's meal right here!",
                "bonusKey": "Crit"
            }),
        new MealBase(39, <MealModel>{
                "name": "Wedding Cake",
                "cookingReq": 135000000,
                "bonusQty": 2,
                "bonusText": "+{% Pet Fighting Damage",
                "description": "Imagine getting married lol so cringe haha am I right??!?! High-five, fellow kids!",
                "bonusKey": "PetDmg"
            }),
        new MealBase(40, <MealModel>{
                "name": "Eel",
                "cookingReq": 200000000,
                "bonusQty": 1,
                "bonusText": "+{% Line Width in Lab Mainframe",
                "description": "The younger sibling of the Loch Ness Monster. He's real, but no one really cares.",
                "bonusKey": "LinePct"
            }),
        new MealBase(41, <MealModel>{
                "name": "Whipped Cocoa",
                "cookingReq": 300000000,
                "bonusQty": 4,
                "bonusText": "+{% Skill Efficiency",
                "description": "Why is this being served on a plate? Was the cup not good enough for you??",
                "bonusKey": "Seff"
            }),
        new MealBase(42, <MealModel>{
                "name": "Onion",
                "cookingReq": 500000000,
                "bonusQty": 3,
                "bonusText": "+{% Total Damage",
                "description": "No, I'm not crying, this onion is just stimulating the lachrymal glands in my eyes.",
                "bonusKey": "TotDmg"
            }),
        new MealBase(43, <MealModel>{
                "name": "Soda",
                "cookingReq": 700000000,
                "bonusQty": 20,
                "bonusText": "+{% Meal Cooking Speed",
                "description": "Yea those red marks are grill marks, our chef doesn't know what he's doing.",
                "bonusKey": "Mcook"
            }),
        new MealBase(44, <MealModel>{
                "name": "Sushi Roll",
                "cookingReq": 900000000,
                "bonusQty": 7,
                "bonusText": "+{% VIP Library Membership",
                "description": "For something called a 'sushi roll', it isn't moving around very much.",
                "bonusKey": "VIP"
            }),
        new MealBase(45, <MealModel>{
                "name": "Buncha Banana",
                "cookingReq": 1250000000,
                "bonusQty": 4,
                "bonusText": "+{ Max LVs for TP Pete Star Talent",
                "description": "Straight from the island of Karjama! Or something like that, starts with a K at least.",
                "bonusKey": "TPpete"
            }),
        new MealBase(46, <MealModel>{
                "name": "Pumpkin",
                "cookingReq": 1700000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "According to the author of the Iliad, its value should peak right around January...",
                "bonusKey": "non"
            }),
        new MealBase(47, <MealModel>{
                "name": "Cotton Candy",
                "cookingReq": 4000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "The most exquisite of fairground cuisine!",
                "bonusKey": "non"
            }),
        new MealBase(48, <MealModel>{
                "name": "Massive Fig",
                "cookingReq": 7000000000,
                "bonusQty": 3,
                "bonusText": "+{% Total Damage",
                "description": "This thing has gotta weigh at least 30!",
                "bonusKey": "TotDmg"
            }),
        new MealBase(49, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(50, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(51, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(52, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(53, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(54, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(55, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(56, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(57, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(58, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            }),
        new MealBase(59, <MealModel>{
                "name": "Turkey a la Thank",
                "cookingReq": 50000000000,
                "bonusQty": 2,
                "bonusText": "+{% EXP from World 1 Mobs",
                "description": "Do I smell forgiveness? Oh, no that's just fake gratitude.",
                "bonusKey": "non"
            })    
]
}
