import type { GoldenFood } from './golden-food';
import { Card } from './cards';
import { EquipmentBonus } from './equipment-effects';
import { Food } from './items';
import type { Player } from './player';
import type { Alchemy } from './world-2/alchemy/alchemy';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';
import type { Family } from './family';
import { ClassIndex } from './talents';
import type { PlayerStatues } from './world-1/statues';
import { ShrineConstants, type Shrine } from './world-3/construction/shrines';
import type { Quests } from './quests';
import type { Storage } from './storage';


interface HealthInputs {
    cardsBaseHP: number;
    alchemyBaseHP: number;
    stampsBaseHP: number;
    statueBaseHP: number;
    postOfficeBaseHP: number;
    postOfficePercentHP: number;
    shrinePercentHP: number;
    activeBuffPenalty: number;
    familyPercentHP: number;
    cardsPercentHP: number;
    starSignsPercentHP: number;
    elderlyPeanutOverride: boolean;
}

interface HealthTalentBonuses {
    baseHP: number;
    additionalBaseHP: number;
    activeBuffPenalty: number;
    strengthPercent: number;
    healthPercent: number;
    healthAndManaPercent: number;
}
export class PlayerHealth {
    private baseMPFromCards: number = 0;
    private baseMPFromAlchemy: number = 0;
    private baseMPFromStamps: number = 0;
    private baseMPFromTalent: number = 0;
    private totalWisdom: number = 0;
    private baseMPFromPostOffice: number = 0;
    private manaTalentPercent: number = 0;
    private healthAndManaTalentPercent: number = 0;
    private postOfficeMPPercent: number = 0;
    private cardMPPercent: number = 0;
    private normalMaxMP: number = 0;
    private alchemyMaxMP: number = 0;
    private miscHPPercent: number = 0;
    private foodHP: number = 0;
    private alchemyFoodHP: number = 0;
    private goldenHP: number = 1;
    private alchemyGoldenHP: number = 1;
    private normalMaxHP: number = 0;
    private alchemyMaxHP: number = 0;

    updateGoldenHP(normal: number, beforeHealthAndManaBubbles: number): void {
        this.goldenHP = normal;
        this.alchemyGoldenHP = beforeHealthAndManaBubbles;
    }


    private calculateHP(player: Player, inputs: HealthInputs, talents: HealthTalentBonuses, goldenFood: number, foodHP: number): number {
        if (inputs.elderlyPeanutOverride) {
            return 1;
        }
        const flatHP = 15 + inputs.cardsBaseHP + inputs.alchemyBaseHP
            + (inputs.stampsBaseHP + (foodHP + inputs.statueBaseHP))
            + (inputs.postOfficeBaseHP + (talents.baseHP + talents.additionalBaseHP)
                + Math.pow(player.stats.strength * (1 + talents.strengthPercent / 100), 1.05));
        // Keep the ordered percentage factors separate from the nested flat-health sum.
        const percentMultiplier = (1 + (talents.healthPercent + (talents.healthAndManaPercent + this.miscHPPercent)) / 100)
            * (1 + inputs.shrinePercentHP / 100) * goldenFood
            * (1 + inputs.postOfficePercentHP / 100) * (1 - talents.activeBuffPenalty / 100)
            * (1 + (inputs.familyPercentHP + inputs.cardsPercentHP) / 100)
            * (1 + inputs.starSignsPercentHP / 100);
        // The four Colosseum maps apply their normal-character health multiplier after all other factors.
        const mapMultiplier = player.currentMapId > 19 && player.currentMapId < 24 ? 164 : 1;
        return flatHP * percentMultiplier * mapMultiplier;
    }

    updateHP(player: Player, inputs: HealthInputs): void {
        this.normalMaxHP = this.calculateHP(player, inputs, {
            baseHP: player.getTalentBonus(0),
            additionalBaseHP: player.getTalentBonus(642),
            strengthPercent: player.getTalentBonus(95),
            healthPercent: player.getTalentBonus(92),
            healthAndManaPercent: player.getTalentBonus(272),
            activeBuffPenalty: inputs.activeBuffPenalty,
        }, this.goldenHP, this.foodHP);
        this.alchemyMaxHP = this.calculateHP(player, inputs, {
            baseHP: player.getTalentBonusAtInputs(0, player.beforeActiveBubbleMultiplierTalentInputs),
            additionalBaseHP: player.getTalentBonusAtInputs(642, player.beforeActiveBubbleMultiplierTalentInputs),
            strengthPercent: player.getTalentBonusAtInputs(95, player.beforeActiveBubbleMultiplierTalentInputs),
            healthPercent: player.getTalentBonusAtInputs(92, player.beforeActiveBubbleMultiplierTalentInputs),
            healthAndManaPercent: player.getTalentBonusAtInputs(272, player.beforeActiveBubbleMultiplierTalentInputs),
            // An active HP penalty uses its talent's preparation-time level, not its final level.
            activeBuffPenalty: player.activeBuffs.some(talent => talent.skillIndex === 108)
                ? player.getTalentBonusAtInputs(108, player.beforeActiveBubbleMultiplierTalentInputs) : 0,
        }, this.alchemyGoldenHP, this.alchemyFoodHP);
    }

    // MinEff samples health before Alchemy finishes its talent-level and golden-food bubble inputs.
    getAlchemyMaxHP(): number {
        return this.alchemyMaxHP;
    }

    // Temporary dungeon, Wraith, and Tempest health do not belong to the normal-character maximum.
    getMaxHP(): number {
        return this.normalMaxHP;
    }



    updateFoodHP(normal: number, beforeActiveBubbleMultiplier: number): void {
        this.foodHP = normal;
        this.alchemyFoodHP = beforeActiveBubbleMultiplier;
    }

    getFoodHP(): number {
        return this.foodHP;
    }

    updateMiscHP(player: Player): void {
        // Maximum-HP equipment effects supply the miscellaneous percentage in the health formula.
        this.miscHPPercent = player.getEquipmentBonus(EquipmentBonus.MaxHp);
    }

    getMiscHP(): number {
        return this.miscHPPercent;
    }

    updateNormalMP(player: Player, alchemy: Alchemy, stamps: Stamp[][]): void {
        const cards = player.cardInfo!.equippedCards;
        this.baseMPFromCards = Card.GetTotalBonusForId(cards, 3);
        // Missing BaseMP bubbles contribute zero through the existing Alchemy lookup.
        this.baseMPFromAlchemy = alchemy.getBubbleBonusForKey('BaseMP', player);
        this.baseMPFromStamps = getStampBonusForKey(stamps, 'BaseMP');
        this.baseMPFromTalent = player.getTalentBonus(1);
        this.totalWisdom = player.stats.wisdom;
        this.manaTalentPercent = player.getTalentBonus(452);
        this.healthAndManaTalentPercent = player.getTalentBonus(272);
        this.cardMPPercent = Card.GetTotalBonusForId(cards, 29);

        this.baseMPFromPostOffice = 0;
        this.postOfficeMPPercent = 0;
        for (const box of player.postOffice) {
            let boxBaseMP = 0;
            let boxMPPercent = 0;
            for (let index = 0; index < box.bonuses.length; index++) {
                const bonus = box.bonuses[index];
                if (bonus.data.bonusKey === 'baseMP') {
                    boxBaseMP += bonus.getBonus(box.level, index);
                }
                if (bonus.data.bonusKey === 'pctMP') {
                    boxMPPercent += bonus.getBonus(box.level, index);
                }
            }
            this.baseMPFromPostOffice += boxBaseMP;
            this.postOfficeMPPercent += boxMPPercent;
        }

        // Preserve the normal mana formula's nested flat sum and combined percentage factor.
        const flatMP = 10 + this.baseMPFromCards + this.baseMPFromAlchemy + this.baseMPFromStamps
            + (this.baseMPFromTalent + (this.totalWisdom + this.baseMPFromPostOffice));
        const percentMultiplier = (1 + (this.manaTalentPercent + this.healthAndManaTalentPercent) / 100)
            * (1 + (this.postOfficeMPPercent + this.cardMPPercent) / 100);
        this.normalMaxMP = flatMP * percentMultiplier;
    }

    updateAlchemyMP(player: Player): void {
        const earlyTalentBonus = player.getTalentBonusAtInputs(1, player.beforeActiveBubbleMultiplierTalentInputs);

        const flatMP = 10 + this.baseMPFromCards + this.baseMPFromAlchemy + this.baseMPFromStamps
            + (earlyTalentBonus + (this.totalWisdom + this.baseMPFromPostOffice));
        // Both percentage talents use the same preparation-time levels as the flat mana talent.
        const earlyManaTalentPercent = player.getTalentBonusAtInputs(452, player.beforeActiveBubbleMultiplierTalentInputs);
        const earlyHealthAndManaTalentPercent = player.getTalentBonusAtInputs(272, player.beforeActiveBubbleMultiplierTalentInputs);
        const percentMultiplier = (1 + (earlyManaTalentPercent + earlyHealthAndManaTalentPercent) / 100)
            * (1 + (this.postOfficeMPPercent + this.cardMPPercent) / 100);
        this.alchemyMaxMP = flatMP * percentMultiplier;
    }

    // ChopEff uses mana sampled during Alchemy preparation, not the final talent-level result.
    getAlchemyMaxMP(): number {
        return this.alchemyMaxMP;
    }

    // Final normal-character mana excludes temporary dungeon mana.
    getMaxMP(): number {
        return this.normalMaxMP;
    }
}

export const updatePlayerHealth = (accountData: Map<string, any>): void => {
    const players = accountData.get('players') as Player[];
    const alchemy = accountData.get('alchemy') as Alchemy;
    const stamps = accountData.get('stamps') as Stamp[][];
    const family = accountData.get('family') as Family;
    const statues = accountData.get('statues') as PlayerStatues[];
    const shrines = accountData.get('shrines') as Shrine[];
    const quests = accountData.get('quests') as Quests;
    const storage = accountData.get('storage') as Storage;
    const goldenFood = accountData.get('goldenFood') as GoldenFood;
    const boostFoodStamp = getStampBonusForKey(stamps, 'BFood');
    for (const player of players) {
        player.health.updateNormalMP(player, alchemy, stamps);
        player.health.updateMiscHP(player);
        const foodInputs = {
            boostFoodStamp,
            foodStatue: statues[player.playerID].statues.find(statue => statue.index === 3)!.getBonus(player),
        };
        player.health.updateFoodHP(
            Food.getBaseHPContribution(player, foodInputs, player.finalTalentInputs),
            Food.getBaseHPContribution(player, foodInputs, player.beforeActiveBubbleMultiplierTalentInputs),
        );
        player.health.updateAlchemyMP(player);
        player.health.updateGoldenHP(goldenFood.getHP(player), goldenFood.getAlchemyHP(player));

        let postOfficeBaseHP = 0;
        let postOfficePercentHP = 0;
        for (const box of player.postOffice) {
            let boxBaseHP = 0;
            let boxPercentHP = 0;
            for (let index = 0; index < box.bonuses.length; index++) {
                const bonus = box.bonuses[index];
                if (bonus.data.bonusKey === 'baseHP') {
                    boxBaseHP += bonus.getBonus(box.level, index);
                }
                if (bonus.data.bonusKey === 'pctHP') {
                    boxPercentHP += bonus.getBonus(box.level, index);
                }
            }
            postOfficeBaseHP += boxBaseHP;
            postOfficePercentHP += boxPercentHP;
        }
        let elderlyPeanuts = 0;
        for (const item of storage.playerStorage[player.playerID]) {
            if (item.internalName === 'Quest47') {
                elderlyPeanuts += item.count;
            }
        }
        player.health.updateHP(player, {
            cardsBaseHP: Card.GetTotalBonusForId(player.cardInfo!.equippedCards, 1),
            alchemyBaseHP: alchemy.getBubbleBonusForKey('BaseHP', player),
            stampsBaseHP: getStampBonusForKey(stamps, 'BaseHP'),
            statueBaseHP: statues[player.playerID].statues.find(statue => statue.index === 4)!.getBonus(player),
            postOfficeBaseHP,
            postOfficePercentHP,
            shrinePercentHP: shrines[ShrineConstants.HpDefShrine].getBonus(player.currentMapId),
            activeBuffPenalty: player.activeBuffs.find(talent => talent.skillIndex === 108)?.getBonus() ?? 0,
            familyPercentHP: family.getClassBonus(ClassIndex.Squire)!.getBonus(player),
            cardsPercentHP: Card.GetTotalBonusForId(player.cardInfo!.equippedCards, 8),
            starSignsPercentHP: player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Total HP'), 0),
            // Elderly Peanut forces a Journeyman to one HP while the Cactolyte quest is active.
            elderlyPeanutOverride: player.classId === ClassIndex.Journeyman
                && quests.playerData[player.playerID].Cactolyte3 === 0 && elderlyPeanuts >= 1,
        });
    }
};
