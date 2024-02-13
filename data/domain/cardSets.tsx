import { Card } from "./cards";
import { ImageData } from "./imageData";
import { CardSetBase, initCardSetRepo } from './data/CardSetRepo';

export class CardSet {
    cards: Card[];

    constructor(public index: number, public data: CardSetBase, public setCards: Card[] = []) {
        this.cards = setCards;
    }

    getImageData = (): ImageData => {
        return {
            location: `${this.data.data.image}`,
            width: 28,
            height: 36
        }
    }

    getStars = (): number => {
        switch (true) {
            case this.cards.reduce((sum, card) => {return sum+card.getStars();}, 0) >= this.cards.length * 5: return 5;
            case this.cards.reduce((sum, card) => {return sum+card.getStars();}, 0) >= this.cards.length * 4: return 4;
            case this.cards.reduce((sum, card) => {return sum+card.getStars();}, 0) >= this.cards.length * 3: return 3;
            case this.cards.reduce((sum, card) => {return sum+card.getStars();}, 0) >= this.cards.length * 2: return 2;
            case this.cards.reduce((sum, card) => {return sum+card.getStars();}, 0) >= this.cards.length: return 1;
            default: return 0;
        }
    }

    getBonus = (): number => {
        if (this.cards.reduce((sum, card) => {return sum+card.getStars();}, 0) < this.cards.length) {
            return 0;
        }
        const stars = this.getStars();
        return this.data.data.scaling * (stars+1);
    }

    getBonusText = (): string => {
        return this.data.data.bonus.replace(/{/, this.getBonus().toString());
    }

    getBorderImageData = (): ImageData => {
        return {
            location: `CardsBorder${this.getStars()}`,
            width: 31,
            height: 43
        }
    }

    static fromBase = (data: CardSetBase[], cards: Card[] = []) => {
        return data.map((cardSet, index) => new CardSet(index, cardSet, (cards) ? cards.filter(card => card.data.category == cardSet.data.displayName) : []))
    }
}