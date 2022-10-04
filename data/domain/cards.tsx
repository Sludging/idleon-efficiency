import { IDforCardBonus, IDforCardSETbonus } from "../maps";
import { CardDataBase, initCardRepo } from "./data/CardRepo";
import { EnemyInfo } from "./enemies";
import { ImageData } from "./imageData";
import { CardDataModel } from "./model/cardDataModel";

export class Card {
    count: number = 0;
    displayName: string;

    chipBoost: number = 1

    constructor(public index: number, public id: string, public data: CardDataModel) {
        this.displayName = EnemyInfo.find(enemy => enemy.id == id)?.details.Name || "New Monster?";
    }

    getImageData = (): ImageData => {
        return {
            location: `Cards${this.data.cardID}`,
            width: 28,
            height: 36
        }
    }

    getStars = (): number => {
        if (this.count > this.data.perTier * 25)
            return 4;
        if (this.count > this.data.perTier * 9)
            return 3;
        if (this.count > this.data.perTier * 4)
            return 2;
        if (this.count > this.data.perTier)
            return 1;

        return 0;
    }

    getBonus = (): number => {
        if (this.count == 0) {
            return 0;
        }
        const stars = this.getStars();
        return this.data.bonus * (stars + 1) * this.chipBoost;
    }

    getBonusText = (): string => {
        return this.data.effect.replace(/{/, this.getBonus().toString());
    }

    getBorderImageData = (): ImageData => {
        return {
            location: `CardsBorder${this.getStars() + 1}`,
            width: 31,
            height: 43
        }
    }

    static GetTotalBonusForId = (cards: Card[], id: number) => {
        return cards.filter(card => card.data.effect == IDforCardBonus[id].replace(/_/g, ' ')).reduce((sum, card) => sum += card.getBonus(), 0);
    }

    static fromBase = (data: CardDataBase[]) => {
        return data.map((card, index) => new Card(index, card.id, card.data))
    }
}

export interface CardSet {
    text: string
    bonus: number
}

export class CardInfo {
    cards: Card[];
    equippedCards: Card[] = [];
    cardSet: CardSet = { text: 'You don\'t have one equipped!', bonus: 0 };

    constructor(cardData: Record<string, number>, cardSetData: Map<string, number>, equippedCardsData: string[]) {
        this.cards = Card.fromBase(initCardRepo());
        const cardSetInfo = Object.entries(cardSetData)[0];
        if (cardSetInfo) {
            this.cardSet = {
                text: cardSetInfo[0],
                bonus: cardSetInfo[1]
            };
        }
        if (equippedCardsData) {
            equippedCardsData.forEach((card) => {
                const theCard = this.cards.find(x => x.id == card);
                if (theCard) {
                    this.equippedCards.push(theCard);
                }
                else {
                    this.equippedCards.push(new Card(-1, "Empty", { bonus: -1, cardID: "Empty", category: "Empty", effect: "Empty", order: -1, perTier: -1 }))
                }
            });
        }

        this.cards.forEach((card, _) => {
            card.count = cardData[card.id];
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
    const cards = Card.fromBase(initCardRepo());

    cards.forEach(card => {
        card.count = cardData[card.id] ?? 0;
    })

    return cards;
}