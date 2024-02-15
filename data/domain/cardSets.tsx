import { Card } from "./cards";
import { NumberMap } from "../maps";
import { ImageData } from "./imageData";
import { CardSetBase } from "./data/CardSetRepo";

export class CardSet {
    cards: Card[];
    displayName: string = ""; // Name to display on UI
    cardSetName: string = ""; // Name of the set in the cards data (differ from display names sometimes)
    baseBonusValue: number = 0;
    bonusText: string = "";
    setImage: string = "";
    setID: number = 0;

    constructor(public index: number, data: CardSetBase, setCards: Card[] = []) {
        this.baseBonusValue = data.data.scaling;
        this.bonusText = data.data.bonus;
        this.setID = CardSet.getSetID(this.bonusText);
        this.displayName = cardSetMap[this.setID]?.displayName;
        this.cardSetName = cardSetMap[this.setID]?.cardSetName;
        this.setImage = cardSetMap[this.setID]?.image;
        this.cards = setCards?.filter(card => card.data.category == this.cardSetName && card.displayName != "New Monster?");
    }

    getImageData = (): ImageData => {
        return {
            location: `${this.setImage}`,
            width: 28,
            height: 36
        }
    }

    // TODO : When banners are up, change the width and height to better match the images original sizes
    getBannerImageData = (): ImageData => {
        return {
            location: `Cardbanner_${this.cardSetName.replaceAll(' ', '_')}`,
            width: 28,
            height: 36
        }
    }

    getLevel = (): number => {
        if(this.cards.length == 0) {
            return 0;
        }

        const cardsTotalStars = this.getCardsTotalStars();

        switch (true) {
            case cardsTotalStars >= this.cards.length * 6: return 5;
            case cardsTotalStars >= this.cards.length * 5: return 4;
            case cardsTotalStars >= this.cards.length * 4: return 3;
            case cardsTotalStars >= this.cards.length * 3: return 2;
            case cardsTotalStars >= this.cards.length * 2: return 1;
            default: return 0;
        }
    }

    getCardsTotalStars = (): number => {
        return this.cards?.reduce((sum, card) => {return sum+(card.count > 0 ? card.getStars()+1 : 0);}, 0)
    }

    getBonus = (level: number = this.getLevel()): number => {
        return this.baseBonusValue * level;
    }

    getBonusText = (level: number = this.getLevel()): string => {
        return this.bonusText.replace(/{/, this.getBonus(level).toString());
    }

    getBorderImageData = (): ImageData => {
        return {
            location: `CardsBorder${this.getLevel()+1}`,
            width: 31,
            height: 43
        }
    }

    static fromBase = (data: CardSetBase[], cards: Card[] = []) => {
        return data.map((cardSet, index) => new CardSet(index, cardSet, cards))
    }

    static getSetID = (bonus: string): number => {
        var ID = 0 as number;
        // Find the set ID corresponding to the bonus effect of the set
        Object.entries(IDforCardSETbonus).some(([setID, setText], index) => {
            if (ID == 0 && setText == bonus.replaceAll(' ', '_')) {
                ID = parseInt(setID, 10);
                return true;
            }
        })
        return ID;
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