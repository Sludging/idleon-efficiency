import { Domain, type RawData } from './base/domain';
import type { Item } from './items';
import type { Player } from './player';
import type { Sneaking } from './world-6/sneaking';
import { ClassIndex, Talent } from './talents';
import { getCompanionActiveBonus, type Companion } from './companions';
import type { Achievement } from './achievements';
import type { Card } from './cards';
import type { Family } from './family';
import type { EquipmentSets } from './misc/equipmentSets';
import { EquipmentBonus } from './equipment-effects';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';
import type { Bribe } from './world-1/bribes';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Sigils } from './world-2/alchemy/sigils';
import type { Votes } from './world-2/votes';
import type { Cooking } from './world-4/cooking';
import type { LegendTalents } from './world-7/legendTalents';
import type { JellyOperator } from './world-7/jellyOperator';
import type { UpgradeVault } from './upgradeVault';

interface GoldenFoodAccountInputs {
    companion174: number;
    companion48: number;
    companion155: number;
    stamp: number;
    achievement37: number;
    achievement380: number;
    achievement383: number;
    sigil: number;
    meal: number;
    bribe: number;
    pristineCharm: number;
    vote: number;
    legend: number;
    cropFallCardLevel: number;
    anniversaryCardLevel: number;
    vault: number;
    jelly10: number;
    jelly51: number;
}

interface GoldenFoodCharacterInputs {
    secretSetPercent: number;
    family: number;
    equipment: number;
    starSign: number;
    alchemy: number;
    alchemyBeforeHealth: number;
}

export interface GoldenFoodResults {
    effectivity: number;
    alchemyEffectivity: number;
    deathBringer: number;
    alchemyDeathBringer: number;
    hp: number;
    alchemyHP: number;
    monsterCash: number;
    skillExp: number;
    allStatPercent: number;
}

export class GoldenFood extends Domain {
    private readonly results = new Map<number, GoldenFoodResults>();

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number): GoldenFood {
        return this;
    }

    parse(_data: Map<string, any>): void {
        this.results.clear();
    }

    getResults(player: Player): Readonly<GoldenFoodResults> {
        return this.results.get(player.playerID)!;
    }

    getEffectivity(player: Player): number {
        return this.getResults(player).effectivity;
    }

    // MinEff samples golden food before its Alchemy effectiveness bubble exists.
    getAlchemyEffectivity(player: Player): number {
        return this.getResults(player).alchemyEffectivity;
    }

    getDeathBringerBonus(player: Player): number {
        return this.getResults(player).deathBringer;
    }

    getAlchemyDeathBringerBonus(player: Player): number {
        return this.getResults(player).alchemyDeathBringer;
    }

    getHP(player: Player): number {
        return this.getResults(player).hp;
    }

    getAlchemyHP(player: Player): number {
        return this.getResults(player).alchemyHP;
    }

    // Monster Cash and Skill EXP return percentage points, unlike the HP multiplier.
    getMonsterCash(player: Player): number {
        return this.getResults(player).monsterCash;
    }

    getSkillExp(player: Player): number {
        return this.getResults(player).skillExp;
    }

    // All Stat contributes percentage points before the attribute calculation applies its multiplier.
    getAllStatPercent(player: Player): number {
        return this.getResults(player).allStatPercent;
    }

    private calculateEffectivity(account: GoldenFoodAccountInputs, character: GoldenFoodCharacterInputs,
        talent99: number, alchemy: number, deathBringer: number): number {
        const cardsAndLateBonuses = Math.min(4 * account.cropFallCardLevel, 50)
            + Math.min(5 * account.anniversaryCardLevel, 50)
            + (account.companion155 + 1e4 * account.companion174
                + (account.vault + (account.jelly10 + account.jelly51)));
        const accountBonuses = 2 * account.achievement380 + 3 * account.achievement383
            + (account.vote + (deathBringer + (account.companion48 + (account.legend + cardsAndLateBonuses))));
        const additiveBonus = character.equipment + (talent99 + (account.stamp + (account.achievement37
            + (alchemy + (account.sigil + (account.meal + (character.starSign
                + (account.bribe + (account.pristineCharm + accountBonuses)))))))));
        // Shaman Family supplies the base multiplier. Other contributors supply percentage points.
        // The companion improves both the Secret set factor and additive effectiveness.
        return (1 + (character.secretSetPercent + 50 * account.companion174) / 100)
            * (Math.max(character.family, 1) + additiveBonus / 100);
    }

    private calculateEffect(player: Player, sneaking: Sneaking, effect: string, multiplier: number): number {
        let bonus = 0;
        for (let slot = 0; slot < player.foodSlotsOwned; slot++) {
            const food = player.gear.food[slot];
            if (food && food.goldenFood && food.effect === effect) {
                // Equipped matches replace the previous match. Do not round the actual effect.
                bonus = food.goldFoodBonusUnrounded(food.count, multiplier);
            }
        }
        if (sneaking.beanstalking.unlocked) {
            for (const food of sneaking.beanstalking.bonuses) {
                if (food.item.effect === effect) {
                    if (food.level > 0) {
                        bonus += food.item.goldFoodBonusUnrounded(1e3 * Math.pow(10, food.level), multiplier);
                    }
                    // Only the first matching Beanstalk food counts, even when it is not deposited.
                    break;
                }
            }
        }
        return bonus;
    }

    updatePlayer(player: Player, sneaking: Sneaking, account: GoldenFoodAccountInputs,
        character: GoldenFoodCharacterInputs, talent99: number, alchemyTalent99: number,
        deathBringer: number, alchemyDeathBringer: number): void {
        const effectivity = this.calculateEffectivity(account, character, talent99, character.alchemy, deathBringer);
        const alchemyEffectivity = this.calculateEffectivity(account, character, alchemyTalent99,
            character.alchemyBeforeHealth, alchemyDeathBringer);
        this.results.set(player.playerID, {
            effectivity,
            alchemyEffectivity,
            deathBringer,
            alchemyDeathBringer,
            hp: 1 + this.calculateEffect(player, sneaking, 'MaxHPpct', effectivity) / 100,
            alchemyHP: 1 + this.calculateEffect(player, sneaking, 'MaxHPpct', alchemyEffectivity) / 100,
            monsterCash: this.calculateEffect(player, sneaking, 'MonsterCash', effectivity),
            skillExp: this.calculateEffect(player, sneaking, 'SkillExp', effectivity),
            allStatPercent: this.calculateEffect(player, sneaking, 'AllStatz', effectivity),
        });
    }

    reset(): void {
        this.results.clear();
    }
}

export const updateGoldenFood = (accountData: Map<string, any>): void => {
    const goldenFood = accountData.get('goldenFood') as GoldenFood;
    const players = accountData.get('players') as Player[];
    const companions = accountData.get('companions') as Companion[];
    const achievements = accountData.get('achievements') as Achievement[];
    const cards = accountData.get('cards') as Card[];
    const family = accountData.get('family') as Family;
    const equipmentSets = accountData.get('equipmentSets') as EquipmentSets;
    const stamps = accountData.get('stamps') as Stamp[][];
    const bribes = accountData.get('bribes') as Bribe[];
    const alchemy = accountData.get('alchemy') as Alchemy;
    const sigils = accountData.get('sigils') as Sigils;
    const votes = accountData.get('votes') as Votes;
    const cooking = accountData.get('cooking') as Cooking;
    const sneaking = accountData.get('sneaking') as Sneaking;
    const legendTalents = accountData.get('legendTalents') as LegendTalents;
    const upgradeVault = accountData.get('upgradeVault') as UpgradeVault;
    const jelly = accountData.get('jellyOperator') as JellyOperator;
    const pristineCharm = sneaking.pristineCharms.find(charm => charm.data.itemId === 14)!;
    const accountInputs: GoldenFoodAccountInputs = {
        companion174: getCompanionActiveBonus(companions, 174),
        companion48: getCompanionActiveBonus(companions, 48),
        companion155: getCompanionActiveBonus(companions, 155),
        stamp: getStampBonusForKey(stamps, 'GFood'),
        // Nutty Crafter gives five effectiveness points. The later achievements provide completion flags.
        achievement37: achievements[37].completed ? 5 : 0,
        achievement380: achievements[380].completed ? 1 : 0,
        achievement383: achievements[383].completed ? 1 : 0,
        sigil: sigils.sigils[14].getBonus(),
        meal: cooking.getMealBonusForKey('zGoldFood'),
        bribe: bribes.find(bribe => bribe.bribeIndex === 36)!.getBonus(),
        pristineCharm: pristineCharm.unlocked ? pristineCharm.data.x1 : 0,
        vote: votes.getCurrentBonus(26),
        legend: legendTalents.getBonusFromIndex(25),
        cropFallCardLevel: cards.find(card => card.id === 'cropfallEvent1')!.getLevels(),
        anniversaryCardLevel: cards.find(card => card.id === 'anni5Event1')!.getLevels(),
        vault: upgradeVault.getBonusForId(86),
        // Jelly obstruction rewards use the successful-operation unlock gate.
        jelly10: jelly.getObstructionBonus(10),
        jelly51: jelly.getObstructionBonus(51),
    };
    // The greatest-index Death Bringer supplies maps, independently of the best account talent candidate.
    let mapOwner: Player | undefined;
    for (const player of players) {
        if (player.classId === ClassIndex.Death_Bringer
            && (!mapOwner || player.playerID > mapOwner.playerID)) {
            mapOwner = player;
        }
    }
    let billionKillMaps = 0;
    if (mapOwner) {
        // Deathnote records fighting maps only, matching this talent's eligible maps.
        for (const kills of mapOwner.killInfo.values()) {
            if (kills >= 1e9) {
                billionKillMaps++;
            }
        }
    }
    goldenFood.reset();
    for (const player of players) {
        let alchemyBeforeHealth = 0;
        // MinEff reads only the bubble prefix already built when Alchemy samples health.
        healthPrefix: for (const cauldron of alchemy.cauldrons) {
            for (const bubble of cauldron.bubbles) {
                if (bubble.data.bonusKey === 'MinEff') {
                    break healthPrefix;
                }
                if (bubble.data.bonusKey === 'GFoodz') {
                    alchemyBeforeHealth += alchemy.getBonusForPlayer(player, bubble.cauldronIndex, bubble.bubbleIndex);
                }
            }
        }
        const finalInputs = player.finalTalentInputs;
        const beforeActiveBubbleMultiplierInputs = player.beforeActiveBubbleMultiplierTalentInputs;
        // Account candidates retain owner allocation and preset membership, but use the recipient's modifiers.
        const deathBringer = Talent.getAccountTalentBonus(players, 209, finalInputs) * billionKillMaps;
        const alchemyDeathBringer = Talent.getAccountTalentBonus(players, 209, beforeActiveBubbleMultiplierInputs)
            * billionKillMaps;
        goldenFood.updatePlayer(player, sneaking, accountInputs, {
            secretSetPercent: equipmentSets.getSetBonus('SECRET_SET', player, true),
            family: family.getClassBonus(ClassIndex.Shaman)!.getBonus(player),
            equipment: player.gear.getBonus(EquipmentBonus.GoldFoodEffect),
            starSign: player.starSigns.find(sign => sign.name === 'Beanbie Major')?.getBonus('Golden Food') ?? 0,
            alchemy: alchemy.getBubbleBonusForKey('GFoodz', player),
            alchemyBeforeHealth,
        }, player.getTalentBonusAtInputs(99, finalInputs),
        player.getTalentBonusAtInputs(99, beforeActiveBubbleMultiplierInputs), deathBringer, alchemyDeathBringer);
    }
};
