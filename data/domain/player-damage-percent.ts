import type { Account } from './account';
import type { Player } from './player';
import type { UpgradeVault } from './upgradeVault';
import type { Bribe } from './world-1/bribes';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';
import type { PlayerStatues } from './world-1/statues';
import type { Orion } from './world-1/orion';
import type { Poppy } from './world-2/poppy';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Bubba } from './world-3/bubba';
import type { Dungeons } from './dungeons';
import type { Quests } from './quests';
import type { Hole } from './world-5/hole/hole';
import type { Divinity } from './world-5/divinity';
import type { Summoning } from './world-6/summoning';
import type { Farming } from './world-6/farming';
import type { GoldenFood } from './golden-food';
import type { Spelunking } from './world-7/spelunking';
import { SkillsIndex } from './SkillsIndex';
import { lavaLog } from '../utility';
import { getTalentCalculationBonus } from './player-talent-calculations';

const getSecondCurveTalentBonus = (player: Player, skillIndex: number): number => {
    const talent = player.getTalent(skillIndex);
    if (!talent || talent.pointsSpent <= 0.5) {
        return 0;
    }

    const extraLevels = talent.getExtraLevels(
        player.finalTalentInputs,
        player.activeSuperTalentIndexes.has(skillIndex),
    );
    return talent.getBonusAtLevel(talent.pointsSpent + extraLevels, false, true);
};

const getVaultKillTotal = (players: Player[], mapId: number): number => {
    let totalKills = 0;
    for (const currentPlayer of players) {
        totalKills += currentPlayer.killInfo.get(mapId) ?? 0;
    }
    return totalKills < 10 ? 0 : Math.floor(lavaLog(totalKills));
};

export const getPlayerDamagePercentComponent = (
    data: Map<string, any>,
    player: Player,
    damageDealtStatType: number,
): number => {
    const players = data.get('players') as Player[];
    const account = data.get('account') as Account;
    const upgradeVault = data.get('upgradeVault') as UpgradeVault;
    const bribes = data.get('bribes') as Bribe[];
    const quests = data.get('quests') as Quests;
    const stamps = data.get('stamps') as Stamp[][];
    const farming = data.get('farming') as Farming;
    const statues = data.get('statues') as PlayerStatues[];
    const orion = data.get('orion') as Orion;
    const poppy = data.get('poppy') as Poppy;
    const alchemy = data.get('alchemy') as Alchemy;
    const bubba = data.get('bubba') as Bubba;
    const dungeons = data.get('dungeons') as Dungeons;
    const spelunking = data.get('spelunking') as Spelunking;
    const divinity = data.get('divinity') as Divinity;
    const summoning = data.get('summoning') as Summoning;
    const goldenFood = data.get('goldenFood') as GoldenFood;
    const hole = data.get('hole') as Hole;
    const hpAndWorldAdditivePercent = lavaLog(Math.max(player.health.getMaxHP(), 1))
        * player.getTalentBonusAtInputs(86, player.finalTalentInputs)
        + (lavaLog(Math.max(player.health.getMaxMP(), 1))
            * player.getTalentBonusAtInputs(446, player.finalTalentInputs)
            + (orion.getGlobalBonus(2)
                + (poppy.getGlobalBonus(4)
                    + (bubba.getGlobalBonus(4)
                        + (upgradeVault.getBonusForId(80) + spelunking.getUpgradeBonus(64))))));
    const initialAdditivePercent = Math.pow(damageDealtStatType, 0.7)
        + (upgradeVault.getBonusForId(27) * getVaultKillTotal(players, 13)
            + upgradeVault.getBonusForId(15) * account.randomizerMonsterTargetsCompleted
            + (0.4 * upgradeVault.getBonusForId(10) + (bribes.find(bribe => bribe.bribeIndex === 30)?.getBonus() ?? 0))
            + (bribes.find(bribe => bribe.bribeIndex === 20)?.getBonus() ?? 0)
            + (getStampBonusForKey(stamps, 'PctDmg')
                + farming.landrankDatabase.getUpgradeBonusByIndex(14)
                + statues[player.playerID].statues.find(statue => statue.index === 22)!.getBonus(player)
                + player.getTalentBonusAtInputs(113, player.finalTalentInputs))
            + hpAndWorldAdditivePercent);
    let component = 1 + initialAdditivePercent / 100;

    component *= 1 + (player.getTalentBonusAtInputs(284, player.finalTalentInputs)
        * (Math.min(100, player.skills.get(SkillsIndex.Smithing)?.level ?? 0) / 10)) / 100;
    component *= 1 + summoning.getSummoningWinnerBonusFromIndex(0) / 100;

    const holeAndCalculationAdditive = getTalentCalculationBonus(data, player, 305) / 50
        + (getTalentCalculationBonus(data, player, 470) / 10 + hole.getSchematicBonus(57, 0));
    const questAndCurrencyAdditive = getTalentCalculationBonus(data, player, 656)
        + lavaLog(account.island0Currency) * player.getTalentBonusAtInputs(649, player.finalTalentInputs)
        + (lavaLog(dungeons.xp) * player.getTalentBonusAtInputs(638, player.finalTalentInputs)
            + Math.min(quests.getTotalQuestsComplete(), player.getTalentBonusAtInputs(658, player.finalTalentInputs)));
    component *= 1 + (
        getSecondCurveTalentBonus(player, 463) * Math.floor(account.minigameHighscores[0] / 25)
        + (alchemy.getBubbleBonusForKey('W12', player)
            + (alchemy.getBubbleBonusForKey('A12', player) + alchemy.getBubbleBonusForKey('M12', player))
            + getTalentCalculationBonus(data, player, 31)
            + getTalentCalculationBonus(data, player, 110)
            + player.getTalentBonusAtInputs(125, player.finalTalentInputs)
                * getTalentCalculationBonus(data, player, 125)
            + getTalentCalculationBonus(data, player, 485)
            + holeAndCalculationAdditive
            + player.getTalentBonusAtInputs(290, player.finalTalentInputs)
                * Math.floor(Math.min(player.stats.movementSpeed - 1, 10) / 0.15)
            + questAndCurrencyAdditive
            + divinity.getMinorBonus(player.playerID, 7))
    ) / 100;
    component *= goldenFood.getDamageMultiplier(player);

    if (component > 100) {
        component = 100 + Math.max(Math.pow(component - 100, 0.86), 0);
    }
    if (component > 2_000_000) {
        component = 2_000_000 * Math.pow(component / 2_000_000, 0.5);
    }
    if (component > 100_000_000) {
        component = 100_000_000 * Math.pow(component / 100_000_000, 0.3);
    }

    return component;
};
