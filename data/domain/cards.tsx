import { IDforCardBonus, IDforCardSETbonus } from "../maps";
import { EnemyInfo } from "./enemies";

export class Card {
    count: number = 0;
    displayName: string;

    constructor(public index: number, public name: string, public id: string, public category: string, public perTier: number, public effect: string, public bonus: number, public order: number, public chipBoost: number = 1) {
        this.displayName = EnemyInfo.find(enemy => enemy.details.internalName == name)?.details.Name || "New Monster?";
    }


    getClass = (): string => {
        return `icons-2836 icons-Cards${this.id}`
    }

    getStars = (): number => {
        if (this.count > this.perTier * 25)
            return 4;
        if (this.count > this.perTier * 9)
            return 3;
        if (this.count > this.perTier * 4)
            return 2;
        if (this.count > this.perTier)
            return 1;

        return 0;
    }

    getBonus = (): number => {
        if (this.count == 0) {
            return 0;
        }
        const stars = this.getStars();
        return this.bonus * (stars + 1) * this.chipBoost;
    }

    getBonusText = (): string => {
        return this.effect.replace(/{/, this.getBonus().toString());
    }

    getBorderClass = (): string => {
        return `icons-3143 icons-CardsBorder${this.getStars() + 1}`;
    }

    static GetTotalBonusForId = (cards: Card[], id: number) => {
        return cards.filter(card => card.effect == IDforCardBonus[id].replace(/_/g, ' ')).reduce((sum, card) => sum += card.getBonus(), 0);
    }
}

const cardsInit = () => {
    return [
        new Card(0, "mushG", "A0", "Blunder Hills", 5, "+{ Base HP", 12, 12),
        new Card(1, "mushR", "A1", "Blunder Hills", 10, "+{ Base LUK", 3, 3),
        new Card(2, "frogG", "A2", "Blunder Hills", 6, "+{ Base MP", 10, 10),
        new Card(3, "beanG", "A3", "Blunder Hills", 7, "+{ Base Damage", 7, 7),
        new Card(4, "slimeG", "A4", "Blunder Hills", 8, "+{ Base WIS", 2, 2),
        new Card(5, "snakeG", "A5", "Blunder Hills", 9, "+{ Move Spd", 1, 1),
        new Card(6, "carrotO", "A6", "Blunder Hills", 10, "+{ Base AGI", 2, 2),
        new Card(7, "goblinG", "A7", "Blunder Hills", 10, "+{% Total HP", 2, 2),
        new Card(8, "plank", "A8", "Blunder Hills", 10, "+{ Base STR", 2, 2),
        new Card(9, "frogBIG", "A9", "Blunder Hills", 10, "+{% Card Drop Chance", 5, 5),
        new Card(10, "poopSmall", "A10", "Blunder Hills", 10, "+{% Crystal Mob Spawn Chance", 10, 10),
        new Card(11, "ratB", "A11", "Blunder Hills", 10, "+{% Critical Chance", 1, 1),
        new Card(12, "branch", "A12", "Blunder Hills", 10, "+{ Base WIS", 5, 5),
        new Card(13, "acorn", "A13", "Blunder Hills", 10, "+{% Money from Monsters", 5, 5),
        new Card(14, "Crystal0", "A14", "Blunder Hills", 3, "+{% Total Drop Rate", 5, 5),
        new Card(15, "mushW", "A16", "Blunder Hills", 10, "+{% Total Accuracy", 5, 5),
        new Card(16, "jarSand", "B1", "Yum Yum Desert", 10, "+{% EXP Conversion from Talent", 12, 12),
        new Card(17, "mimicA", "B2", "Yum Yum Desert", 10, "+{% Total Drop Rate", 3, 3),
        new Card(18, "crabcake", "B3", "Yum Yum Desert", 10, "+{% To not consume Food", 5, 5),
        new Card(19, "coconut", "B4", "Yum Yum Desert", 10, "+{ Base AGI", 5, 5),
        new Card(20, "sandcastle", "B5", "Yum Yum Desert", 10, "+{% Total Accuracy", 4, 4),
        new Card(21, "pincermin", "B6", "Yum Yum Desert", 10, "+{ Weapon Power", 1, 1),
        new Card(22, "potato", "B7", "Yum Yum Desert", 10, "+{% Critical Damage", 3, 3),
        new Card(23, "steak", "B8", "Yum Yum Desert", 10, "+{ Base STR", 5, 5),
        new Card(24, "moonman", "B9", "Yum Yum Desert", 10, "+{% Monster EXP While Active", 8, 8),
        new Card(25, "sandgiant", "B10", "Yum Yum Desert", 10, "+{% Minimum Damage", 2, 2),
        new Card(26, "snailZ", "B11", "Yum Yum Desert", 10, "+{% Card Drop Chance", 8, 8),
        new Card(27, "shovelR", "B12", "Yum Yum Desert", 10, "+{ Base LUK", 6, 6),
        new Card(28, "Crystal1", "B13", "Yum Yum Desert", 3, "+{% EXP from monsters", 2, 2),
        new Card(29, "Bandit_Bob", "B14", "Yum Yum Desert", 1, "+{% Money from Monsters", 1, 1),
        new Card(30, "Blank", "A0", "Event", 10, "+{% Base HP", 3, 3),
        new Card(31, "Copper", "C1", "Easy Resources", 10, "+{ Base accuracy", 4, 4),
        new Card(32, "Iron", "C2", "Easy Resources", 10, "+{% Total Mining Efficiency", 5, 5),
        new Card(33, "Gold", "C3", "Easy Resources", 10, "+{% Mining EXP", 5, 5),
        new Card(34, "ForgeA", "C16", "Easy Resources", 10, "+{% Smithing EXP", 4, 4),
        new Card(35, "OakTree", "C4", "Easy Resources", 10, "+{ Base Defence", 3, 3),
        new Card(36, "BirchTree", "C5", "Easy Resources", 10, "+{% Total Choppin Efficiency", 5, 5),
        new Card(37, "JungleTree", "C6", "Easy Resources", 10, "+{% Choppin EXP", 5, 5),
        new Card(38, "ForestTree", "C7", "Easy Resources", 10, "+{% EXP Conversion from Talent", 8, 8),
        new Card(39, "Fish1", "C8", "Easy Resources", 10, "+{% Total MP", 3, 3),
        new Card(40, "Fish2", "C9", "Easy Resources", 10, "+{% Total Fishing Efficiency", 5, 5),
        new Card(41, "Fish3", "C10", "Easy Resources", 10, "+{% Fishing EXP", 5, 5),
        new Card(42, "Bug1", "C11", "Easy Resources", 10, "+{% Monster EXP While Active", 4, 4),
        new Card(43, "Bug2", "C12", "Easy Resources", 10, "+{% Total Catching Efficiency", 5, 5),
        new Card(44, "Plat", "D2", "Medium Resources", 10, "+{% Mining Away Gains", 2, 2),
        new Card(45, "Dementia", "D1", "Medium Resources", 10, "+{% Mining Speed", 4, 4),
        new Card(46, "Void", "D3", "Medium Resources", 10, "+{% Total Mining Efficiency", 6, 6),
        new Card(47, "ForgeB", "D16", "Medium Resources", 10, "+{% Smithing EXP", 7, 7),
        new Card(48, "PalmTree", "D7", "Medium Resources", 10, "+{% Choppin Away Gains", 2, 2),
        new Card(49, "ToiletTree", "D5", "Medium Resources", 10, "+{% Choppin Speed", 4, 4),
        new Card(50, "StumpTree", "D6", "Medium Resources", 10, "+{% Total Accuracy", 3, 3),
        new Card(51, "Fish4", "D11", "Medium Resources", 10, "+{% Fishing Away Gains", 2, 2),
        new Card(52, "Bug3", "D10", "Medium Resources", 10, "+{% Catching EXP", 5, 5),
        new Card(53, "Bug4", "D9", "Medium Resources", 10, "+{% Catching Away Gains", 2, 2),
        new Card(54, "SoulCard1", "D17", "Medium Resources", 3, "+{% Defence from Equipment", 3, 3),
        new Card(55, "SoulCard2", "D18", "Medium Resources", 3, "+{ Starting Pts in Worship", 4, 4),
        new Card(56, "CritterCard1", "D19", "Medium Resources", 4, "+{% Shiny Critter Chance", 3, 3),
        new Card(57, "CritterCard2", "D20", "Medium Resources", 4, "+{% Trapping Efficiency", 5, 5),
        new Card(58, "CritterCard3", "D21", "Medium Resources", 4, "+{% Trapping EXP", 5, 5),
        new Card(59, "sheep", "E0", "Frostbite Tundra", 11, "+{% Defence from Equipment", 3, 3),
        new Card(60, "flake", "E1", "Frostbite Tundra", 12, "+{ Base STR", 7, 7),
        new Card(61, "stache", "E2", "Frostbite Tundra", 13, "+{% Card Drop Chance", 9, 9),
        new Card(62, "bloque", "E3", "Frostbite Tundra", 14, "+{ Base AGI", 7, 7),
        new Card(63, "mamoth", "E4", "Frostbite Tundra", 15, "+{% Total HP", 3.5, 3.5),
        new Card(64, "snowball", "E5", "Frostbite Tundra", 15, "+{% Total Damage", 3, 3),
        new Card(65, "penguin", "E6", "Frostbite Tundra", 15, "+{ Base WIS", 7, 7),
        new Card(66, "thermostat", "E7", "Frostbite Tundra", 15, "+{% Critical Damage", 4, 4),
        new Card(67, "glass", "E8", "Frostbite Tundra", 17, "+{ Base LUK", 7, 7),
        new Card(68, "snakeB", "E9", "Frostbite Tundra", 17, "+{% MP regen rate", 5, 5),
        new Card(69, "speaker", "E10", "Frostbite Tundra", 17, "+{% Total Drop Rate", 3, 3),
        new Card(70, "eye", "E11", "Frostbite Tundra", 17, "+{% Total Accuracy", 5, 5),
        new Card(71, "ram", "E14", "Frostbite Tundra", 20, "+{ Weapon Power", 2, 2),
        new Card(72, "skele", "E12", "Frostbite Tundra", 15, "+{% Critical Chance", 1, 1),
        new Card(73, "skele2", "E13", "Frostbite Tundra", 15, "+{% Total Damage", 3, 3),
        new Card(74, "Crystal2", "E15", "Frostbite Tundra", 10, "+{% EXP from monsters", 3, 3),
        new Card(75, "Lustre", "D4", "Hard Resources", 10, "+{% Mining Speed", 5, 5),
        new Card(76, "SoulCard3", "F3", "Hard Resources", 3, "+{ Starting Pts in Worship", 6, 6),
        new Card(77, "SoulCard4", "F10", "Hard Resources", 4, "+{% Max Charge", 7, 7),
        new Card(78, "SoulCard5", "F11", "Hard Resources", 5, "+{% Charge Rate", 5, 5),
        new Card(79, "CritterCard4", "F4", "Hard Resources", 4, "+{% Shiny Critter Chance", 5, 5),
        new Card(80, "CritterCard5", "F5", "Hard Resources", 4, "+{% EXP from monsters", 1.25, 1.25),
        new Card(81, "CritterCard6", "F6", "Hard Resources", 5, "+{% Shiny Critter Chance", 6, 6),
        new Card(82, "CritterCard7", "F7", "Hard Resources", 6, "+{% Skill AFK gain rate", 1, 1),
        new Card(83, "SaharanFoal", "D8", "Hard Resources", 10, "+{% Choppin Away Gains", 2.5, 2.5),
        new Card(84, "Tree7", "F2", "Hard Resources", 10, "+{% Choppin Speed", 6, 6),
        new Card(85, "Bug5", "F8", "Hard Resources", 10, "+{% Total Catching Efficiency", 7, 7),
        new Card(86, "Bug6", "F9", "Hard Resources", 10, "+{% Catching Away Gains", 2.5, 2.5),
        new Card(87, "AlienTree", "F13", "Hard Resources", 10, "+{% Total Choppin Efficiency", 8, 8),
        new Card(88, "Tree8", "F12", "Hard Resources", 10, "+{% Choppin Speed", 7, 7),
        new Card(89, "Bug7", "F14", "Hard Resources", 10, "+{% Total Catching Efficiency", 8, 8),
        new Card(90, "Bug8", "F15", "Hard Resources", 10, "+{% Catching Speed", 4, 4),
        new Card(91, "Starfire", "F16", "Hard Resources", 12, "+{% Mining EXP", 8, 8),
        new Card(92, "CritterCard8", "F17", "Hard Resources", 7, "+{% Trapping Efficiency", 7, 7),
        new Card(93, "CritterCard9", "F18", "Hard Resources", 9, "+{% Trapping EXP", 8, 8),
        new Card(94, "CritterCard10", "F19", "Hard Resources", 12, "+{% Shiny Critter Chance", 8, 8),
        new Card(95, "Fish5", "F20", "Hard Resources", 8, "+{% Total Fishing Efficiency", 8, 8),
        new Card(96, "Fish6", "F21", "Hard Resources", 10, "+{% Fishing Speed", 4, 4),
        new Card(97, "Fish7", "F22", "Hard Resources", 10, "+{% Fishing EXP", 10, 10),
        new Card(98, "Fish8", "F23", "Hard Resources", 10, "+{% Fishing Away Gains", 3, 3),
        new Card(99, "mushP", "G1", "Hyperion Nebula", 15, "+{% Money from Monsters", 8, 8),
        new Card(100, "w4a2", "G2", "Hyperion Nebula", 17, "+{% Breeding EXP (Passive)", 5, 5),
        new Card(101, "w4a3", "G3", "Hyperion Nebula", 18, "+{% Defence from Equipment", 4, 4),
        new Card(102, "demonP", "G4", "Hyperion Nebula", 19, "+{% Crystal Mob Spawn Chance", 15, 15),
        new Card(103, "w4b2", "G6", "Hyperion Nebula", 20, "+{ Star Talent Pts (Passive)", 5, 5),
        new Card(104, "w4b1", "G5", "Hyperion Nebula", 21, "+{ Base WIS", 12, 12),
        new Card(105, "w4b3", "G7", "Hyperion Nebula", 22, "+{% Lab EXP gain", 4, 4),
        new Card(106, "w4b4", "G8", "Hyperion Nebula", 23, "+{ Weapon Power", 2.5, 2.5),
        new Card(107, "w4b5", "G9", "Hyperion Nebula", 24, "+{ Base AGI", 12, 12),
        new Card(108, "w4c1", "G10", "Hyperion Nebula", 26, "+{% Multikill per tier", 1.5, 1.5),
        new Card(109, "w4c2", "G11", "Hyperion Nebula", 27, "+{ Base STR", 12, 12),
        new Card(110, "w4c3", "G12", "Hyperion Nebula", 28, "+{% Critical Chance (Passive)", 1.5, 1.5),
        new Card(111, "w4c4", "G13", "Hyperion Nebula", 30, "+{% All Stat", 0.5, 0.5),
        new Card(112, "Crystal3", "G14", "Hyperion Nebula", 10, "+px Line Width (Passive)", 2, 2),
        new Card(113, "frogP", "X0", "Dungeons", 1.5, "+{ Base Dungeon MP", 2, 2),
        new Card(114, "frogD", "X1", "Dungeons", 2, "+{% Block Chance", 2, 2),
        new Card(115, "frogY", "X2", "Dungeons", 2, "+{ Base Dungeon Damage", 1.5, 1.5),
        new Card(116, "frogR", "X14", "Dungeons", 2, "+{% Dungeon Card Chance", 6, 6),
        new Card(117, "frogW", "X15", "Dungeons", 3, "+{% Dungeon Credits", 2.5, 2.5),
        new Card(118, "frogGR", "X3", "Dungeons", 1.5, "{% to start with RNG item", 15, 15),
        new Card(119, "frogGR2", "X4", "Dungeons", 1.5, "+{% Dungeon Flurbos", 4, 4),
        new Card(120, "frogGR3", "X5", "Dungeons", 1.5, "+{% Dungeon Credits", 5, 5),
        new Card(121, "target", "X6", "Dungeons", 2, "+{ Base Dungeon HP", 2, 2),
        new Card(122, "rocky", "X7", "Dungeons", 2, "+{% Dungeon Card Chance", 8, 8),
        new Card(123, "steakR", "X9", "Dungeons", 2, "+{% Dungeon Money", 6, 6),
        new Card(124, "totem", "X16", "Dungeons", 2, "+{% RNG item rarity", 10, 10),
        new Card(125, "cactus", "X8", "Dungeons", 2, "+{% Dungeon Boss Dmg", 3, 3),
        new Card(126, "potatoB", "X10", "Dungeons", 5, "+{% Dungeon MP regen", 5, 5),
        new Card(127, "snakeZ", "X11", "Dungeons", 1.5, "+{% Dungeon Drop Rate", 4, 4),
        new Card(128, "snakeZ2", "X12", "Dungeons", 1.5, "+{% Total Dungeon Dmg", 5, 5),
        new Card(129, "snakeZ3", "X13", "Dungeons", 1.5, "+{% Dungeon Flurbos", 5, 5),
        new Card(130, "iceknight", "X17", "Dungeons", 8, "+{% Dungeon MP regen", 8, 8),
        new Card(131, "iceBossZ", "X18", "Dungeons", 2, "+{% Dungeon Card Chance", 15, 15),
        new Card(132, "iceBossZ2", "X19", "Dungeons", 1.5, "+{% Dungeon Credits", 8, 8),
        new Card(133, "iceBossZ3", "X20", "Dungeons", 1.5, "+{% Total Dungeon Dmg", 8, 8),
        new Card(134, "babayaga", "Z0", "Bosses", 1.5, "+{% Money from Monsters", 10, 10),
        new Card(135, "poopBig", "Z1", "Bosses", 1.5, "+{% Total Damage", 5, 5),
        new Card(136, "poopD", "A15", "Bosses", 1, "+{% Fighting AFK gain rate", 1, 1),
        new Card(137, "wolfA", "Z2", "Bosses", 1.5, "+{% Skill AFK gain rate", 2.5, 2.5),
        new Card(138, "wolfB", "Z4", "Bosses", 1.5, "+{% Fighting AFK gain rate", 2.5, 2.5),
        new Card(139, "babaHour", "Z5", "Bosses", 1.5, "+{% Double AFK claim chance", 3, 3),
        new Card(140, "babaMummy", "Z6", "Bosses", 1.5, "+{% Total Drop Rate", 6, 6),
        new Card(141, "Boss2A", "Z3", "Bosses", 1.5, "+{% EXP from monsters", 5, 5),
        new Card(142, "Boss2B", "Z7", "Bosses", 1.5, "+{% Skill EXP", 3.75, 3.75),
        new Card(143, "mini3a", "Z12", "Bosses", 5, "+{% Money from Monsters", 12, 12),
        new Card(144, "Boss3A", "Z8", "Bosses", 1.5, "+{% Cog Build Spd (Passive)", 8, 8),
        new Card(145, "Boss3B", "Z9", "Bosses", 1.5, "+{% Shrine Effects", 5, 5),
        new Card(146, "mini4a", "Z13", "Bosses", 5, "+{% Cooking EXP gain", 6, 6),
        new Card(147, "Boss4A", "Z10", "Bosses", 2, "+{% Kitchen Speed (Passive)", 6, 6),
        new Card(148, "Boss4B", "Z11", "Bosses", 2, "+{% All Skill Efficiency", 10, 10),
        new Card(149, "ghost", "Y0", "Event", 2, "+{% Monster EXP While Active", 3, 3),
        new Card(150, "xmasEvent", "Y1", "Event", 1.5, "+{% Total Drop Rate", 3, 3),
        new Card(151, "xmasEvent2", "Y2", "Event", 1.5, "+{% Money from Monsters", 3, 3),
        new Card(152, "slimeR", "Y3", "Event", 2, "+{% Defence from Equipment", 3, 3),
        new Card(153, "loveEvent", "Y4", "Event", 1.5, "+{% Total HP", 5, 5),
        new Card(154, "loveEvent2", "Y5", "Event", 1.5, "+{% Boost Food Effect", 4, 4),
        new Card(155, "sheepB", "Y6", "Event", 3, "+{% MP regen rate", 3, 3),
        new Card(156, "snakeY", "Y7", "Event", 3, "+{ Base LUK", 3, 3),
        new Card(157, "EasterEvent1", "Y8", "Event", 1.5, "+{% Card Drop Chance", 1, 1),
        new Card(158, "EasterEvent2", "Y9", "Event", 1.5, "+{% Critical Damage", 1, 1),
        new Card(159, "shovelY", "Y13", "Event", 4, "+{ Base Defence", 2, 2),
        new Card(160, "crabcakeB", "Y10", "Event", 4, "+{% Total Drop Rate", 3, 3),
        new Card(161, "SummerEvent1", "Y11", "Event", 8, "+{% Fishing Away Gains", 1, 1),
        new Card(162, "SummerEvent2", "Y12", "Event", 8, "+{% Catching EXP", 4, 4),
        new Card(163, "xmasEvent3", "Y14", "Event", 1, "+{% Defence from Equipment", 3, 3),
    ];
}

export interface CardSet {
    text: string
    bonus: number
}

export class CardInfo {
    cards: Card[] = cardsInit();
    equippedCards: Card[] = [];
    cardSet: CardSet = { text: 'You don\'t have one equipped!', bonus: 0 };

    constructor(cardData: Record<string, number>, cardSetData: Map<string, number>, equippedCardsData: string[]) {
        const cardSetInfo = Object.entries(cardSetData)[0];
        if (cardSetInfo) {
            this.cardSet = {
                text: cardSetInfo[0],
                bonus: cardSetInfo[1]
            };
        }
        equippedCardsData.forEach((card) => {
            const theCard = this.cards.find(x => x.name == card);
            if (theCard) {
                this.equippedCards.push(theCard);
            }
            else {
                this.equippedCards.push(new Card(-1, "Empty", "Empty", "Empty", -1, "Empty", -1, -1))
            }
        });

        this.cards.forEach((card, _) => {
            card.count = cardData[card.name];
        });
    }

    getCardSetText = (): string => {
        return this.cardSet.text.replace(/_/g, " ").replace("{", this.cardSet.bonus.toString());
    }

    getBonusForId = (id: number) => {
        if (this.cardSet.text == IDforCardSETbonus[id]) {
            return this.cardSet.bonus;
        }
        return 0;
    }
}

export default function parseCards(cardData: Record<string, number>) {
    const cards = cardsInit();

    cards.forEach(card => {
        card.count = cardData[card.name] ?? 0;
    })

    return cards;
}