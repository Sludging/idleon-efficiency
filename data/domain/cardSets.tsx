import { Card } from './cards';
import { NumberMap } from "../maps";
import { ImageData } from './imageData';
import { CardSetBase } from './data/CardSetRepo';

export class CardSet {
    cards: Card[];

    constructor(public index: number, public data: CardSetBase, public setCards: Card[] = []) {
        this.cards = setCards;
    }

    getImageData = (): ImageData => {
        return {
            location: `${this.data.data.image.replace(".png", "")}`,
            width: 28,
            height: 36
        }
    }

    getStars = (): number => {
        if(this.cards.length == 0) {
            return 0;
        }

        switch (true) {
            case this.cards.reduce((sum, card) => {return sum+card.getStars();}, 0) >= this.cards.length * 6: return 6;
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
        return this.data.data.scaling * (stars);
    }

    getBonusText = (): string => {
        return this.data.data.bonus.replace(/{/, this.getBonus().toString());
    }

    getBorderImageData = (): ImageData => {
        return {
            location: `CardsBorder${this.getStars()+1}`,
            width: 31,
            height: 43
        }
    }

    static fromBase = (data: CardSetBase[], cards: Card[] = []) => {
        return data.map((cardSet, index) => new CardSet(index, cardSet, (cards) ? cards.filter(card => card.data.category == cardSet.data.displayName) : []))
    }
}

export const IDforCardSETbonus: NumberMap = {
    0: "{%_EXP_if_below_Lv_50",
    1: "{%_All_Food_Effect",
    2: "{%_Skill_Efficiency",
    3: "{%_Skill_EXP_Gain",
    4: "{%_DEF_and_ACC",
    5: "{%_Dmg,_Drop,_and_EXP",
    6: "{%_Drop_Rate",
    7: "{%_Skill_AFK_Gain_Rate",
    8: "{%_more_Dungeon_Credits",
    9: "{%_Crit_Chance",
    10: "{%_Fight_AFK_Gain_Rate",
}

interface cardSetInfo {
    displayName: string,
    cardSetName: string,
    image: string,
}

// The IDs correspond to IDforCardSETbonus IDs
// In case you want to get those infos from data in CardSetRepo you'll need to find the right ID using CardSet.getSetID() for example
export const cardSetMap: Record<number, cardSetInfo> = {
    0: { displayName: "Blunder Hills", cardSetName: "Blunder Hills", image: "CardSet0"},
    1: { displayName: "Yum-Yum Desert", cardSetName: "Yum Yum Desert", image: "CardSet1"},
    2: { displayName: "Easy Resources", cardSetName: "Easy Resources", image: "CardSet2"},
    3: { displayName: "Medium Resources", cardSetName: "Medium Resources", image: "CardSet3"},
    4: { displayName: "Frostbite Tundra", cardSetName: "Frostbite Tundra", image: "CardSet4"},
    5: { displayName: "Bosses n Nightmares", cardSetName: "Bosses", image: "CardSet26"},
    6: { displayName: "Events", cardSetName: "Event", image: "CardSet25"},
    7: { displayName: "Hard Resources", cardSetName: "Hard Resources", image: "CardSet5"},
    8: { displayName: "Dungeons", cardSetName: "Dungeons", image: "CardSet7"},
    9: { displayName: "Hyperion Nebula", cardSetName: "Hyperion Nebula", image: "CardSet6"},
    10: { displayName: "Smolderin' Plateau", cardSetName: "Smolderin' Plateau", image: "CardSet8"},
};