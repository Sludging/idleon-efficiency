import { NumberMap } from "../maps";
import { SkillsIndex } from "./SkillsIndex";
import { Domain, RawData } from "./base/domain";
import { CardDataBase, initCardRepo } from "./data/CardRepo";
import { EnemyInfo } from "./enemies";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { IDforCardSETbonus, cardSetMap } from "./cardSets";
import { CardDataModel } from "./model/cardDataModel";
import { Player } from "./player";
import { Rift, SkillMastery } from "./rift";
import { initCardDropChanceRepo } from './data/CardDropChanceRepo';
import { nFormatter } from '../utility';

export class Card {
    count: number = 0;
    displayName: string;
    bonusID: number = 0;

    chipBoost: number = 1;
    baseMaxCardLevel: number = 4;
    bonusMaxCardLevelFromSpelunking: number = 0;
    bonusMaxCardLevelFromRift: number = 0;
    passive: boolean = false;

    baseDropChance: number;

    constructor(public index: number, public id: string, public data: CardDataModel) {
        this.displayName = EnemyInfo.find(enemy => enemy.id == id)?.details.Name || "New Monster?";
        if (data.effect.endsWith("(Passive)")) {
            this.passive = true;
        }
        this.bonusID = this.getBonusID();
        this.baseDropChance = initCardDropChanceRepo()?.find(cardRate => cardRate.id == "Cards"+this.data.cardID)?.data.dropChance || 0;
        // I noticed some cards (namely w4 crystal mob for now) don't have the { in the bonus text, so I force it into it to at least show it somehow when displaying the bonus effect
        if(this.data.effect.indexOf('{') == -1) {
            if(this.data.effect.startsWith('+')) {
                this.data.effect=this.data.effect.slice(0,1)+'{'+this.data.effect.slice(1);
            } else {
                this.data.effect='{'+this.data.effect;
            }            
        }
    }

    getMaxCardLevel = (): number => {
        return this.baseMaxCardLevel + this.bonusMaxCardLevelFromRift + this.bonusMaxCardLevelFromSpelunking;
    }

    getImageData = (): ImageData => {
        return {
            location: `Cards${this.data.cardID}`,
            width: 28,
            height: 36
        }
    }

    getLargeImageData = (): ImageData => {
        return {
            location: `2Cards${this.data.cardID}`,
            width: 56,
            height: 72
        }
    }

    getLevels = (): number => {
        switch (true) {
            case this.getMaxCardLevel() >= 7 && this.count >= Math.floor(this.getCardsForLevel(7)): return 7;
            case this.getMaxCardLevel() >= 6 && this.count >= Math.floor(this.getCardsForLevel(6)): return 6;
            case this.count >= Math.floor(this.getCardsForLevel(4)): return 5;
            case this.count >= Math.floor(this.getCardsForLevel(3)): return 4;
            case this.count >= Math.floor(this.getCardsForLevel(2)): return 3;
            case this.count >= Math.floor(this.getCardsForLevel(1)): return 2;
            case this.count >= Math.floor(this.getCardsForLevel(1)): return 1;
            default: return 0;
        }
    }

    getBaseDropRateText = (): string => {
        return (this.baseDropChance > 0) ? "1 in "+nFormatter(Math.round(1/this.baseDropChance)) : "Not Found";
    }

    getCardsForLevel = (level: number): number => {
        if (level <= 0) {
            return 1;
        }

        // cchiz is .. special? .. who knows why...
        if (this.id == "Boss3B") {
            return 1.5 * Math.pow(level + 1 + Math.floor(level / 3), 2)
        } else {
            return this.data.perTier * Math.pow(level + 1 + (Math.floor(level / 3) + (16 * Math.floor(level / 4) + 100 * Math.floor(level / 5))), 2);
        }
    }

    getBonus = (level: number = this.getLevels()): number => {
        if (this.count == 0) {
            return 0;
        }
        return this.data.bonus * (level + 1) * this.chipBoost;
    }

    getBonusText = (level: number = this.getLevels()): string => {
        return this.data.effect.replace(/{/, this.getBonus(level).toString());
    }

    getBorderImageData = (): ImageData => {
        return {
            location: `CardsBorder${this.getLevels() + 1}`,
            width: 31,
            height: 43
        }
    }

    getLargeBorderImageData = (): ImageData => {
        const stars = this.getLevels();
        if (stars <= 0) {
            // There is no big border image for 0 star cards, so aas the small border is just no image we use it here too
            return {
                location: `CardsBorder1`,
                width: 68,
                height: 100
            }
        } else {
            return {
                location: `CardEquipBorder${stars}`,
                width: 68,
                height: 100
            }
        }
    }

    getBonusID = (): number => {
        var ID = 0 as number;
        // Find the bonus ID corresponding to the bonus effect of the card
        Object.entries(IDforCardBonus).some(([bonusID, bonusText], index) => {
            if (ID == 0 && bonusText == this.data.effect.replaceAll(' ', '_')) {
                ID = parseInt(bonusID, 10);
                return true;
            }
        })
        return ID;
    }

    static GetTotalBonusForId = (cards: Card[], id: number) => {
        return cards.filter(card => card.data.effect == IDforCardBonus[id].replace(/_/g, ' ')).reduce((sum, card) => sum += card.getBonus(card.getLevels()), 0);
    }

    static getStarImageForLevel = (level: number): ImageData => {
        return {
            location: `Star${level}`,
            width: 26,
            height: 12
        }
    }

    static fromBase = (data: CardDataBase[]) => {
        return data.map((card, index) => new Card(index, card.id, card.data))
    }
}

export interface CardSet {
    id: number
    text: string
    bonus: number
}

export class CardInfo {
    cards: Card[];
    equippedCards: Card[] = [];
    cardSet: CardSet = { id: -1, text: 'You don\'t have one equipped!', bonus: 0};

    constructor(cardData: Record<string, number>, cardSetData: Map<string, number>, equippedCardsData: string[]) {
        this.cards = Card.fromBase(initCardRepo());
        const cardSetInfo = Object.entries(cardSetData)[0];
        if (cardSetInfo) {
            this.cardSet = {
                id: IDforCardSETbonus.find(set => set.data.bonus == cardSetInfo[0])?.index ?? -1,
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

    getCardSetIcon = (): string => {
        return cardSetMap[this.cardSet.id]?.image ?? '';
    }

    getBonusForId = (id: number) => {
        const matchingSet = IDforCardSETbonus.at(id);
        if (matchingSet && this.cardSet.text == matchingSet.data.bonus) {
            return this.cardSet.bonus;
        }
        return 0;
    }
}

export class Cards extends Domain {
    getRawKeys(): RawData[] {
        return [
            { key: "Cards0", default: {}, perPlayer: false }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return Card.fromBase(initCardRepo());
    }

    parse(data: Map<string, any>): void {
        const cardData = data.get("Cards0") as Record<string, number>;
        const cards = data.get(this.getDataKey()) as Card[];

        cards.forEach(card => {
            card.count = cardData[card.id] ?? 0;
        })
    }
}

export const initCards = () => {
    return Card.fromBase(initCardRepo());
}

export const updateCards = (data: Map<string, any>) => {
    const cards = data.get("cards") as Card[];
    const rift = data.get("rift") as Rift;
    const players = data.get("players") as Player[];
    const optLacc = data.get("OptLacc");

    const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;

    if (skillMastery?.active) {
        Object.entries(skillMastery.skillLevels).map(([skillAsString, skillLevel], index) => {
            const skillName = SkillsIndex[parseInt(skillAsString)];
            const skillIndex = SkillsIndex[skillName as keyof typeof SkillsIndex];

            if (SkillsforIDCardPassiveBonus[skillIndex].length > 0 && skillMastery.getSkillRank(skillIndex) >= 3) {

                SkillsforIDCardPassiveBonus[skillIndex].forEach(bonusID => {
                    ((cards) ? cards.filter(card => card.bonusID == bonusID) : []).forEach(card => {
                        card.passive = true;
                    })
                    players.flatMap(player => player.cardInfo?.cards ?? []).filter(card => card.bonusID == bonusID).forEach(card => {
                        card.passive = true;
                    })
                })                
            }
        })
    }

    if (rift.bonuses.find(bonus => bonus.name == "Ruby Cards")?.active) {
        cards.forEach(card => {
            card.bonusMaxCardLevelFromRift = 1;
        })
        // I should probably not duplicate cards at some point, but for now ...
        players.flatMap(player => player.cardInfo?.cards ?? []).forEach(card => {
            card.bonusMaxCardLevelFromRift = 1;
        })
    }
    else if (optLacc.length > 155 && optLacc[155] != 0) {
        const cardifiedFiveStarCards = (optLacc[155] as string).split(",");
        cardifiedFiveStarCards.forEach(cardId => {
            cards.forEach(card => {
                if (card.id == cardId) {
                    card.bonusMaxCardLevelFromRift = 1;
                }
            })
            // I should probably not duplicate cards at some point, but for now ...
            players.flatMap(player => player.cardInfo?.cards ?? []).forEach(card => {
                if (card.id == cardId) {
                    card.bonusMaxCardLevelFromRift = 1;
                }
            })
        })
    }
}

export const SkillsforIDCardPassiveBonus: Record<SkillsIndex, number[]> = {
    [SkillsIndex.Mining]: [24, 25, 33, 34],
    [SkillsIndex.Smithing]: [],
    [SkillsIndex.Chopping]: [27, 28, 36, 37],
    [SkillsIndex.Fishing]: [30, 31, 39, 45],
    [SkillsIndex.Alchemy]: [],
    [SkillsIndex.Catching]: [32, 40, 41, 75],
    [SkillsIndex.Trapping]: [53, 57, 58],
    [SkillsIndex.Construction]: [],
    [SkillsIndex.Worship]: [52, 54, 55],
    [SkillsIndex.Cooking]: [],
    [SkillsIndex.Breeding]: [],
    [SkillsIndex.Intellect]: [],
    [SkillsIndex.Sailing]: [],
    [SkillsIndex.Divinity]: [],
    [SkillsIndex.Gaming]: [],
    [SkillsIndex.Farming]: [],
    [SkillsIndex.Sneaking]: [],
    [SkillsIndex.Summoning]: [],
    [SkillsIndex.Spelunking]: [97, 98, 99],
}

export const IDforCardBonus: NumberMap = {
    1: "+{_Base_HP",
    2: "+{_Base_LUK",
    3: "+{_Base_MP",
    4: "+{_Base_Damage",
    5: "+{_Base_WIS",
    6: "+{_Move_Spd",
    7: "+{_Base_AGI",
    8: "+{%_Total_HP",
    9: "+{_Base_STR",
    10: "+{%_Total_Drop_Rate",
    11: "+{%_Money_from_Monsters",
    12: "+{%_Card_Drop_Chance",
    13: "+{%_Critical_Chance",
    14: "+{%_Crystal_Mob_Spawn_Chance",
    15: "+{%_Defence_from_Equipment",
    16: "+{%_To_not_consume_Food",
    17: "+{%_Total_Accuracy",
    18: "+{_Weapon_Power",
    19: "+{%_Critical_Damage",
    20: "+{%_Monster_EXP_While_Active",
    21: "+{%_Minimum_Damage",
    22: "+{%_EXP_Conversion_from_Talent",
    23: "+{_Base_accuracy",
    24: "+{%_Total_Mining_Efficiency",
    25: "+{%_Mining_EXP",
    26: "+{_Base_Defence",
    27: "+{%_Total_Choppin_Efficiency",
    28: "+{%_Choppin_EXP",
    29: "+{%_Total_MP",
    30: "+{%_Total_Fishing_Efficiency",
    31: "+{%_Fishing_EXP",
    32: "+{%_Total_Catching_Efficiency",
    33: "+{%_Mining_Away_Gains",
    34: "+{%_Mining_Speed",
    35: "+{%_NOTHING",
    36: "+{%_Choppin_Away_Gains",
    37: "+{%_Choppin_Speed",
    38: "+Blank",
    39: "+{%_Fishing_Away_Gains",
    40: "+{%_Catching_EXP",
    41: "+{%_Catching_Away_Gains",
    42: "+{%_Total_Damage",
    43: "+{%_Fighting_AFK_gain_rate",
    44: "+{%_EXP_from_monsters",
    45: "+{%_Fishing_Speed",
    46: "+{%_Skill_AFK_gain_rate",
    47: "+{%_Double_AFK_claim_chance",
    48: "+{%_Boost_Food_Effect",
    49: "+{%_Smithing_EXP_(Passive)",
    50: "+{%_Skill_EXP",
    51: "+{%_MP_regen_rate",
    52: "+{%_Max_Charge",
    53: "+{%_Shiny_Critter_Chance",
    54: "+{%_Charge_Rate",
    55: "+{_Starting_Pts_in_Worship",
    56: "+{%_Base_HP",
    57: "+{%_Trapping_Efficiency",
    58: "+{%_Trapping_EXP",
    59: "+{%_Shrine_Effects_(Passive)",
    60: "+{%_Cog_Build_Spd_(Passive)",
    61: "+{_Base_Dungeon_MP",
    62: "+{%_Block_Chance",
    63: "+{_Base_Dungeon_Damage",
    64: "+{%_Dungeon_Card_Chance",
    65: "+{%_Dungeon_Credits",
    66: "{%_to_start_with_RNG_orb_(Passive)",
    67: "+{%_Dungeon_Flurbos",
    68: "+{_Base_Dungeon_HP",
    69: "+{%_Dungeon_Money",
    70: "+{%_RNG_item_rarity",
    71: "+{%_Dungeon_Boss_Dmg",
    72: "+{%_Total_Dungeon_Dmg",
    73: "+{%_Dungeon_MP_regen",
    74: "+{%_Dungeon_Drop_Rate",
    75: "+{%_Catching_Speed",
    76: "+{%_Breeding_EXP_(Passive)",
    77: "+{%_Kitchen_Speed_(Passive)",
    78: "+{_Star_Talent_Pts_(Passive)",
    79: "+{%_Lab_EXP_gain",
    80: "+{%_Multikill_per_tier",
    81: "+{%_Critical_Chance_(Passive)",
    82: "+{%_All_Stat",
    83: "+{px_Line_Width_(Passive)",
    84: "+{%_All_Skill_Efficiency",
    85: "+{%_Cooking_EXP_gain",
    86: "+{%_Dungeon_Move_Speed",
    87: "+{%_Sailing_Speed_(Passive)",
    88: "+{%_Skill_EXP_(Passive)",
    89: "+{%_Divinity_EXP_(Passive)",
    90: "+{%_Money_from_mobs_(Passive)",
    91: "+{_Weapon_Power_(Passive)",
    92: "+{%_Sailing_Speed_(Passive)",
    93: "+{%_Skill_Efficncy_(Passive)",
    94: "+{%_Class_EXP_(Passive)",
    95: "+{%_All_Skill_EXP_(Passive)",
    96: "+{%_Total_Damage_Multi",
    97: "+{%_Spelunking_EXP",
    98: "+{%_Spelunking_Efficiency",
    99: "+{%_Spelunking_AFK_Gain",
    100: "+{%_Class_EXP_Multi",
    101: "+{%_Drop_Rate_Multi",
}
