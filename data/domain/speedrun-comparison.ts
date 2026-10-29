import { EnemyData } from './enemies';
import { MapInfoModel } from './model/mapInfoModel';
import type { Player } from './player';
import { getMaximumDamage } from './player-damage';
import type { SpeedrunCombatEstimate } from './speedrun';
import {
    getSpeedrunEffectiveEnemyHP,
    getSpeedrunHitChance,
} from './speedrun-combat-stats';
import { prepareSpeedrunKillCredit, SpeedrunKillCredit } from './speedrun-kill-credit';

export const getSpeedrunPortalEstimate = (
    estimate: SpeedrunCombatEstimate,
    requiredKills: number,
): SpeedrunCombatEstimate => {
    const reachable = estimate.reachable
        && Number.isFinite(requiredKills) && requiredKills > 0
        && Number.isFinite(estimate.portalProgressPerKill) && estimate.portalProgressPerKill > 0;
    return {
        ...estimate,
        reachable,
        killsNeeded: reachable ? Math.ceil(requiredKills / estimate.portalProgressPerKill) : undefined,
    };
};


/** Estimates portal progress from the game's credit per defeated monster. */
export class SpeedrunComparison {
    private readonly killCredit: SpeedrunKillCredit;

    constructor(
        private readonly data: Map<string, any>,
        private readonly player: Player,
        accountMultikillPerTierBonus: number,
    ) {
        this.killCredit = prepareSpeedrunKillCredit(data, player, accountMultikillPerTierBonus);
    }

    getForTarget(
        map: Readonly<MapInfoModel>,
        enemy: EnemyData,
        radiusBonus: number,
    ): SpeedrunCombatEstimate {
        const maximumDamage = getMaximumDamage(this.data, this.player, map.id);
        const effectiveHP = getSpeedrunEffectiveEnemyHP(this.data, this.player, enemy.details.MonsterHPTotal);
        const hitChance = getSpeedrunHitChance(this.player.stats.accuracy, enemy.details.Defence);
        const credit = this.killCredit.getForTarget(map.id, effectiveHP, enemy.details.Defence, maximumDamage, radiusBonus);
        return {
            reachable: Number.isFinite(maximumDamage) && maximumDamage > 0
                && hitChance > 0
                && Number.isFinite(credit.portalProgressPerKill) && credit.portalProgressPerKill > 0,
            maximumDamage,
            ...credit,
            killsNeeded: undefined,
        };
    }

    getWithRadius(
        map: Readonly<MapInfoModel>,
        enemy: EnemyData,
        normal: SpeedrunCombatEstimate,
        radiusBonus: number,
    ): SpeedrunCombatEstimate {
        // Radius changes kill credit without changing whether the character can defeat the monster.
        const effectiveHP = getSpeedrunEffectiveEnemyHP(this.data, this.player, enemy.details.MonsterHPTotal);
        const credit = this.killCredit.getForTarget(map.id, effectiveHP, enemy.details.Defence, normal.maximumDamage, radiusBonus);
        return {
            ...normal,
            ...credit,
            reachable: normal.reachable
                && Number.isFinite(credit.portalProgressPerKill) && credit.portalProgressPerKill > 0,
            killsNeeded: undefined,
        };
    }
}
