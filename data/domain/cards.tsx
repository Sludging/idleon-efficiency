import { EnemyInfo } from "./enemies";

export class Card {
    count: number = 0;
    displayName: string;

    constructor(public name: string, public id: string, public category: string, public perTier: number, public effect: string, public bonus: number, public order: number) 
    { 
        this.displayName = EnemyInfo.find(enemy => enemy.details.internalName == name)?.details.Name || "New Monster?";
    }


    getClass = (): string => {
        return `icons-2836 icons-Cards${this.id}`
    }

    getStars = (): number => {
        if (this.count > this.perTier * 9)
            return 3;
        if (this.count > this.perTier * 4)
            return 2;
        if (this.count > this.perTier)
            return 1;

        return 0;
    }

    getBonus = (): number => {
        const stars = this.getStars();
        return this.bonus * (stars + 1);
    }

    getBonusText = (): string => {
        return this.effect.replace("+", this.getBonus().toString());
    }

    getBorderClass = (): string => {
        return `icons-3143 icons-CardsBorder${this.getStars() + 1}`;
    }
}

const cardsInit = () => {
    return [
        new Card("mushG", "A0", "Blunder Hills", 5, "+ Base HP", 12, 12),
        new Card("mushR", "A1", "Blunder Hills", 10, "+ Base LUK", 3, 3),
        new Card("frogG", "A2", "Blunder Hills", 6, "+ Base MP", 10, 10),
        new Card("beanG", "A3", "Blunder Hills", 7, "+ Base Damage", 7, 7),
        new Card("slimeG", "A4", "Blunder Hills", 8, "+ Base WIS", 2, 2),
        new Card("snakeG", "A5", "Blunder Hills", 9, "+ Move Spd", 1, 1),
        new Card("carrotO", "A6", "Blunder Hills", 10, "+ Base AGI", 2, 2),
        new Card("goblinG", "A7", "Blunder Hills", 10, "+% Total HP", 2, 2),
        new Card("plank", "A8", "Blunder Hills", 10, "+ Base STR", 2, 2),
        new Card("frogBIG", "A9", "Blunder Hills", 10, "+% Card Drop Chance", 5, 5),
        new Card("poopSmall", "A10", "Blunder Hills", 10, "+% Crystal Mob Spawn Chance", 10, 10),
        new Card("ratB", "A11", "Blunder Hills", 10, "+% Critical Chance", 1, 1),
        new Card("branch", "A12", "Blunder Hills", 10, "+ Base WIS", 5, 5),
        new Card("acorn", "A13", "Blunder Hills", 10, "+% Money from Monsters", 5, 5),
        new Card("Crystal0", "A14", "Blunder Hills", 3, "+% Total Drop Rate", 5, 5),
        new Card("mushW", "A16", "Blunder Hills", 10, "+% Total Accuracy", 5, 5),
        new Card("jarSand", "B1", "Yum Yum Desert", 10, "+% EXP Conversion from Talent", 12, 12),
        new Card("mimicA", "B2", "Yum Yum Desert", 10, "+% Total Drop Rate", 3, 3),
        new Card("crabcake", "B3", "Yum Yum Desert", 10, "+% To not consume Food", 5, 5),
        new Card("coconut", "B4", "Yum Yum Desert", 10, "+ Base AGI", 5, 5),
        new Card("sandcastle", "B5", "Yum Yum Desert", 10, "+% Total Accuracy", 4, 4),
        new Card("pincermin", "B6", "Yum Yum Desert", 10, "+ Weapon Power", 1, 1),
        new Card("potato", "B7", "Yum Yum Desert", 10, "+% Critical Damage", 3, 3),
        new Card("steak", "B8", "Yum Yum Desert", 10, "+ Base STR", 5, 5),
        new Card("moonman", "B9", "Yum Yum Desert", 10, "+% Monster EXP While Active", 8, 8),
        new Card("sandgiant", "B10", "Yum Yum Desert", 10, "+% Minimum Damage", 2, 2),
        new Card("snailZ", "B11", "Yum Yum Desert", 10, "+% Card Drop Chance", 8, 8),
        new Card("shovelR", "B12", "Yum Yum Desert", 10, "+ Base LUK", 6, 6),
        new Card("Crystal1", "B13", "Yum Yum Desert", 3, "+% EXP from monsters", 2, 2),
        new Card("Bandit_Bob", "B14", "Yum Yum Desert", 1, "+% Money from Monsters", 1, 1),
        new Card("Blank", "A0", "Event", 10, "+% Base HP", 3, 3),
        new Card("Copper", "C1", "Easy Resources", 10, "+ Base accuracy", 4, 4),
        new Card("Iron", "C2", "Easy Resources", 10, "+% Total Mining Efficiency", 5, 5),
        new Card("Gold", "C3", "Easy Resources", 10, "+% Mining EXP", 5, 5),
        new Card("ForgeA", "C16", "Easy Resources", 10, "+% Smithing EXP", 4, 4),
        new Card("OakTree", "C4", "Easy Resources", 10, "+ Base Defence", 3, 3),
        new Card("BirchTree", "C5", "Easy Resources", 10, "+% Total Choppin Efficiency", 5, 5),
        new Card("JungleTree", "C6", "Easy Resources", 10, "+% Choppin EXP", 5, 5),
        new Card("ForestTree", "C7", "Easy Resources", 10, "+% EXP Conversion from Talent", 8, 8),
        new Card("Fish1", "C8", "Easy Resources", 10, "+% Total MP", 3, 3),
        new Card("Fish2", "C9", "Easy Resources", 10, "+% Total Fishing Efficiency", 5, 5),
        new Card("Fish3", "C10", "Easy Resources", 10, "+% Fishing EXP", 5, 5),
        new Card("Bug1", "C11", "Easy Resources", 10, "+% Monster EXP While Active", 4, 4),
        new Card("Bug2", "C12", "Easy Resources", 10, "+% Total Catching Efficiency", 5, 5),
        new Card("Plat", "D2", "Medium Resources", 10, "+% Mining Away Gains", 2, 2),
        new Card("Dementia", "D1", "Medium Resources", 10, "+% Mining Speed", 4, 4),
        new Card("Void", "D3", "Medium Resources", 10, "+% Card Drop Chance", 6, 6),
        new Card("ForgeB", "D16", "Medium Resources", 10, "+% Smithing EXP", 7, 7),
        new Card("PalmTree", "D7", "Medium Resources", 10, "+% Choppin Away Gains", 2, 2),
        new Card("ToiletTree", "D5", "Medium Resources", 10, "+% Choppin Speed", 4, 4),
        new Card("StumpTree", "D6", "Medium Resources", 10, "+% Total Accuracy", 3, 3),
        new Card("Fish4", "D11", "Medium Resources", 10, "+% Fishing Away Gains", 2, 2),
        new Card("Bug3", "D10", "Medium Resources", 10, "+% Catching EXP", 5, 5),
        new Card("Bug4", "D9", "Medium Resources", 10, "+% Catching Away Gains", 2, 2),
        new Card("SoulCard1", "D17", "Medium Resources", 3, "+% Defence from Equipment", 3, 3),
        new Card("SoulCard2", "D18", "Medium Resources", 3, "+ Starting Pts in Worship", 4, 4),
        new Card("CritterCard1", "D19", "Medium Resources", 4, "+% Shiny Critter Chance", 3, 3),
        new Card("CritterCard2", "D20", "Medium Resources", 4, "+% Trapping Efficiency", 5, 5),
        new Card("CritterCard3", "D21", "Medium Resources", 4, "+% Trapping EXP", 5, 5),
        new Card("sheep", "E0", "Frostbite Tundra", 11, "+% Defence from Equipment", 3, 3),
        new Card("flake", "E1", "Frostbite Tundra", 12, "+ Base STR", 7, 7),
        new Card("stache", "E2", "Frostbite Tundra", 13, "+% Card Drop Chance", 9, 9),
        new Card("bloque", "E3", "Frostbite Tundra", 14, "+ Base AGI", 7, 7),
        new Card("mamoth", "E4", "Frostbite Tundra", 15, "+% Total HP", 3.5, 3.5),
        new Card("snowball", "E5", "Frostbite Tundra", 15, "+% Total Damage", 3, 3),
        new Card("penguin", "E6", "Frostbite Tundra", 15, "+ Base WIS", 7, 7),
        new Card("thermostat", "E7", "Frostbite Tundra", 15, "+% Critical Damage", 4, 4),
        new Card("glass", "E8", "Frostbite Tundra", 17, "+ Base LUK", 7, 7),
        new Card("snakeB", "E9", "Frostbite Tundra", 17, "+% MP regen rate", 5, 5),
        new Card("speaker", "E10", "Frostbite Tundra", 17, "+% Total Drop Rate", 3, 3),
        new Card("eye", "E11", "Frostbite Tundra", 17, "+% Total Accuracy", 5, 5),
        new Card("ram", "E14", "Frostbite Tundra", 20, "+ Weapon Power", 2, 2),
        new Card("skele", "E12", "Frostbite Tundra", 15, "+% Critical Chance", 1, 1),
        new Card("skele2", "E13", "Frostbite Tundra", 15, "+% Total Damage", 3, 3),
        new Card("Crystal2", "E15", "Frostbite Tundra", 10, "+% EXP from monsters", 3, 3),
        new Card("Lustre", "D4", "Hard Resources", 10, "+ Base LUK", 4, 4),
        new Card("SoulCard3", "F3", "Hard Resources", 3, "+ Starting Pts in Worship", 6, 6),
        new Card("SoulCard4", "F10", "Hard Resources", 4, "+% Max Charge", 7, 7),
        new Card("SoulCard5", "F11", "Hard Resources", 5, "+% Charge Rate", 5, 5),
        new Card("CritterCard4", "F4", "Hard Resources", 4, "+% Shiny Critter Chance", 5, 5),
        new Card("CritterCard5", "F5", "Hard Resources", 4, "+% EXP from monsters", 1.25, 1.25),
        new Card("CritterCard6", "F6", "Hard Resources", 5, "+% Shiny Critter Chance", 6, 6),
        new Card("CritterCard7", "F7", "Hard Resources", 6, "+% Skill AFK gain rate", 1, 1),
        new Card("SaharanFoal", "D8", "Hard Resources", 10, "+% Choppin Away Gains", 2.5, 2.5),
        new Card("Tree7", "F2", "Hard Resources", 10, "+% Choppin Speed", 6, 6),
        new Card("Bug5", "F8", "Hard Resources", 10, "+% Total Catching Efficiency", 7, 7),
        new Card("Bug6", "F9", "Hard Resources", 10, "+% Catching Away Gains", 2.5, 2.5),
        new Card("frogP", "X0", "Dungeons", 1.5, "+ Base Dungeon MP", 2, 2),
        new Card("frogD", "X1", "Dungeons", 2, "+% Block Chance", 2, 2),
        new Card("frogY", "X2", "Dungeons", 2, "+ Base Dungeon Damage", 1.5, 1.5),
        new Card("frogR", "X14", "Dungeons", 2, "+% Dungeon Card Chance", 6, 6),
        new Card("frogW", "X15", "Dungeons", 3, "+% Dungeon Credits", 2.5, 2.5),
        new Card("frogGR", "X3", "Dungeons", 1.5, "% to start with RNG item", 15, 15),
        new Card("frogGR2", "X4", "Dungeons", 1.5, "+% Dungeon Flurbos", 4, 4),
        new Card("frogGR3", "X5", "Dungeons", 1.5, "+% Dungeon Credits", 5, 5),
        new Card("target", "X6", "Dungeons", 2, "+ Base Dungeon HP", 2, 2),
        new Card("rocky", "X7", "Dungeons", 2, "+% Dungeon Card Chance", 8, 8),
        new Card("steakR", "X9", "Dungeons", 2, "+% Dungeon Money", 6, 6),
        new Card("totem", "X16", "Dungeons", 2, "+% RNG item rarity", 10, 10),
        new Card("cactus", "X8", "Dungeons", 2, "+% Dungeon Boss Dmg", 3, 3),
        new Card("potatoB", "X10", "Dungeons", 5, "+% Dungeon MP regen", 5, 5),
        new Card("snakeZ", "X11", "Dungeons", 1.5, "+% Dungeon Drop Rate", 4, 4),
        new Card("snakeZ2", "X12", "Dungeons", 1.5, "+% Total Dungeon Dmg", 5, 5),
        new Card("snakeZ3", "X13", "Dungeons", 1.5, "+% Dungeon Flurbos", 5, 5),
        new Card("iceknight", "X17", "Dungeons", 8, "+% Dungeon MP regen", 8, 8),
        new Card("iceBossZ", "X18", "Dungeons", 2, "+% Dungeon Card Chance", 15, 15),
        new Card("iceBossZ2", "X19", "Dungeons", 1.5, "+% Dungeon Credits", 8, 8),
        new Card("iceBossZ3", "X20", "Dungeons", 1.5, "+% Total Dungeon Dmg", 8, 8),
        new Card("babayaga", "Z0", "Bosses", 1.5, "+% Money from Monsters", 10, 10),
        new Card("poopBig", "Z1", "Bosses", 1.5, "+% Total Damage", 5, 5),
        new Card("poopD", "A15", "Bosses", 1, "+% Fighting AFK gain rate", 1, 1),
        new Card("wolfA", "Z2", "Bosses", 1.5, "+% Skill AFK gain rate", 2.5, 2.5),
        new Card("wolfB", "Z4", "Bosses", 1.5, "+% Fighting AFK gain rate", 2.5, 2.5),
        new Card("babaHour", "Z5", "Bosses", 1.5, "+% Double AFK claim chance", 3, 3),
        new Card("babaMummy", "Z6", "Bosses", 1.5, "+% Total Drop Rate", 6, 6),
        new Card("Boss2A", "Z3", "Bosses", 1.5, "+% EXP from monsters", 5, 5),
        new Card("Boss2B", "Z7", "Bosses", 1.5, "+% Skill EXP", 3.75, 3.75),
        new Card("Boss3A", "Z8", "Bosses", 1.5, "+% Cog Build Spd (Passive)", 8, 8),
        new Card("Boss3B", "Z9", "Bosses", 1.5, "+% Shrine Effects", 5, 5),
        new Card("ghost", "Y0", "Event", 2, "+% Monster EXP While Active", 3, 3),
        new Card("xmasEvent", "Y1", "Event", 1.5, "+% Total Drop Rate", 3, 3),
        new Card("xmasEvent2", "Y2", "Event", 1.5, "+% Money from Monsters", 3, 3),
        new Card("slimeR", "Y3", "Event", 2, "+% Defence from Equipment", 3, 3),
        new Card("loveEvent", "Y4", "Event", 1.5, "+% Total HP", 5, 5),
        new Card("loveEvent2", "Y5", "Event", 1.5, "+% Boost Food Effect", 4, 4),
        new Card("sheepB", "Y6", "Event", 3, "+% MP regen rate", 3, 3),
        new Card("snakeY", "Y7", "Event", 3, "+ Base LUK", 3, 3),
        new Card("EasterEvent1", "Y8", "Event", 1.5, "+% Card Drop Chance", 1, 1),
        new Card("EasterEvent2", "Y9", "Event", 1.5, "+% Critical Damage", 1, 1),
        new Card("shovelY", "Y13", "Event", 4, "+ Base Defence", 2, 2),
        new Card("crabcakeB", "Y10", "Event", 4, "+% Total Drop Rate", 3, 3),
        new Card("SummerEvent1", "Y11", "Event", 8, "+% Fishing Away Gains", 1, 1),
        new Card("SummerEvent2", "Y12", "Event", 8, "+% Catching EXP", 4, 4),
        new Card("xmasEvent3", "Y14", "Event", 1, "+% Defence from Equipment", 3, 3),
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
        });

        this.cards.forEach((card, _) => {
            card.count = cardData[card.name];
        });
    }

    getCardSetText = (): string => {
        return this.cardSet.text.replace(/_/g, " ").replace("{", this.cardSet.bonus.toString());
    }
}

export default function parseCards(cardData: Record<string, number>) {
    const cards = cardsInit();

    cards.forEach(card => {
        card.count = cardData[card.name];
    })

    return cards;
}