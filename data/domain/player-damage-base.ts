import { Card } from './cards';
import { EquipmentBonus } from './equipment-effects';
import { Food, type BoostFoodEffectivenessInputs } from './items';
import { getStatCards } from './player-stats';
import type { Player } from './player';
import { ClassIndex } from './talents';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';
import type { PlayerStatues } from './world-1/statues';
import type { Arcade } from './world-2/arcade';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Sigils } from './world-2/alchemy/sigils';
import type { Hole } from './world-5/hole/hole';
import type { Meritocraty } from './world-7/meritocraty';
import type { UpgradeVault } from './upgradeVault';
import type { Orion } from './world-1/orion';
import type { GoldenFood } from './golden-food';
import { lavaLog } from '../utility';

export const getPrimaryDamageStat = (player: Player): number => {
    switch (player.getBaseClass()) {
        case ClassIndex.Warrior:
            return player.stats.strength;
        case ClassIndex.Archer:
            return player.stats.agility;
        case ClassIndex.Mage:
            return player.stats.wisdom;
        default:
            return player.stats.luck;
    }
};

export const getDamageAttributeContribution = (data: Map<string, any>, player: Player): number => {
    const primaryStat = getPrimaryDamageStat(player);
    const alchemy = data.get('alchemy') as Alchemy;
    return primaryStat * (1 + (
        player.getTalentBonusAtInputs(95, player.finalTalentInputs)
        + player.getTalentBonusAtInputs(455, player.finalTalentInputs)
        + player.getTalentBonusAtInputs(20, player.finalTalentInputs)
        + alchemy.getBubbleBonusForKey('W6', player)
        + alchemy.getBubbleBonusForKey('A6', player)
        + alchemy.getBubbleBonusForKey('M6', player)
    ) / 100);
};

const getVaultKillTotal = (players: Player[], mapId: number): number => {
    let totalKills = 0;
    for (const currentPlayer of players) {
        totalKills += currentPlayer.killInfo.get(mapId) ?? 0;
    }
    return totalKills < 10 ? 0 : Math.floor(lavaLog(totalKills));
};

const applyBaseDamageSoftcaps = (value: number): number => {
    if (value > 4_000) {
        value = 4_000 + Math.max(Math.pow(value - 4_000, 0.91), 0);
        if (value > 15_000) {
            value = 15_000 + Math.max(Math.pow(value - 15_000, 0.84), 0);
        }
    }
    return value;
};

export const getPlayerDamageBaseComponent = (
    data: Map<string, any>,
    player: Player,
    damageDealtStatType = getDamageAttributeContribution(data, player),
): number => {
    const players = data.get('players') as Player[];
    const upgradeVault = data.get('upgradeVault') as UpgradeVault;
    const orion = data.get('orion') as Orion;
    const hole = data.get('hole') as Hole;
    const arcade = data.get('arcade') as Arcade;
    const alchemy = data.get('alchemy') as Alchemy;
    const stamps = data.get('stamps') as Stamp[][];
    const statues = data.get('statues') as PlayerStatues[];
    const sigils = data.get('sigils') as Sigils;
    const meritocraty = data.get('meritocraty') as Meritocraty;
    const goldenFood = data.get('goldenFood') as GoldenFood;


    const weaponPower = player.stats.weaponPower;
    let base = Math.pow((weaponPower * (1 + (
        player.getTalentBonusAtInputs(97, player.finalTalentInputs)
        + player.getTalentBonusAtInputs(277, player.finalTalentInputs)
        + player.getTalentBonusAtInputs(457, player.finalTalentInputs)
        + hole.majiks.IdleonUpgrades[4].getBonus()
    ) / 100) + player.getTalentBonusAtInputs(5, player.finalTalentInputs)) / 3, 2)
        + damageDealtStatType
        + goldenFood.getBaseDamage(player)
        + Math.min(150, 2 * weaponPower + damageDealtStatType)
        + arcade.bonuses[0].getBonus()
        + orion.getGlobalBonus(1)
        + upgradeVault.getBonusForId(0)
        + upgradeVault.getBonusForId(20) * getVaultKillTotal(players, 24);

    base += getStampBonusForKey(stamps, 'BaseDmg')
        + player.gear.getBonus(EquipmentBonus.BaseDamage)
        + statues[player.playerID].statues[0].getBonus(player)
        + player.getPostOfficeBonus('basedmg')
        + alchemy.getBubbleBonusForKey('bdmgHP', player) * lavaLog(Math.max(player.health.getMaxHP() - 250, 1))
        + alchemy.getBubbleBonusForKey('bdmgSPD', player) * (Math.log2(Math.max(player.stats.movementSpeed - 0.1, 0)) / 0.25)
        + alchemy.getBubbleBonusForKey('bdmgMP', player) * lavaLog(Math.max(player.health.getMaxMP() - 150, 1))
        + Card.GetTotalBonusForId(getStatCards(player), 4)
        + sigils.sigils[4].getBonus() * (1 + meritocraty.getCurrentBonus(21) / 100)
        + player.cardInfo!.cards.find(card => card.id === 'fallEvent2')!.getLevels();
    const foodInputs: BoostFoodEffectivenessInputs = {
        boostFoodStamp: getStampBonusForKey(stamps, 'BFood'),
        foodStatue: statues[player.playerID].statues.find(statue => statue.index === 3)!.getBonus(player),
    };
    return applyBaseDamageSoftcaps(base)
        + Food.getBaseDamageContribution(player, foodInputs, player.finalTalentInputs);
};
