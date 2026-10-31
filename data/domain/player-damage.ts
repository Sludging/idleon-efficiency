import type { Player } from './player';
import { getDamageAttributeContribution, getPlayerDamageBaseComponent } from './player-damage-base';
import { getPlayerDamagePercentComponent } from './player-damage-percent';
import { getPlayerDamageTotalMultiplier } from './player-damage-multiplier';
export const getMaximumDamage = (data: Map<string, any>, player: Player, mapId: number = player.currentMapId): number => {
    const damageAttribute = getDamageAttributeContribution(data, player);
    const base = getPlayerDamageBaseComponent(data, player, damageAttribute);
    const percent = getPlayerDamagePercentComponent(data, player, damageAttribute);
    const totalMultiplier = getPlayerDamageTotalMultiplier(data, player, mapId);
    return base * percent * totalMultiplier;
};
