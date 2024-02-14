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

export const cardSetMap = {
    None: "None",
    "{%_EXP_if_below_Lv_50": { name: "Blunder_Hills", rawName: 'CardSet0', base: 8 },
    "{%_All_Food_Effect": { name: "Yum-Yum_Desert", rawName: 'CardSet1', base: 10 },
    "{%_Skill_Efficiency": { name: "Easy_Resources", rawName: 'CardSet2', base: 8 },
    "{%_Skill_EXP_Gain": { name: "Medium_Resources", rawName: 'CardSet3', base: 5 },
    "{%_DEF_and_ACC": { name: "Frostbite_Tundra", rawName: 'CardSet4', base: 5 },
    "{%_Skill_AFK_Gain_Rate": { name: "Hard_Resources", rawName: 'CardSet5', base: 4 },
    "{%_Dmg,_Drop,_and_EXP": { name: "Bosses_n_Nightmares", rawName: 'CardSet26', base: 6 },
    "{%_Drop_Rate": { name: "Events", rawName: 'CardSet25', base: 5 },
    "{%_Crit_Chance": { name: "Hyperion_Nebula", rawName: 'CardSet6', base: 5 },
    "{%_Fight_AFK_Gain_Rate": { name: "Smolderin'_Plateau", rawName: 'CardSet8', base: 5 },
};