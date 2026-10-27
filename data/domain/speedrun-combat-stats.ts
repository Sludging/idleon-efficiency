import type { Player } from './player';
import type { Prayer } from './world-3/prayers';

/** Returns the native monster hit chance as a percentage. */
export const getSpeedrunHitChance = (accuracy: number, defence: number): number => {
    const ratio = accuracy / defence;
    return ratio >= 0.5 ? Math.floor(Math.min(100 * (0.95 * ratio - 0.425), 100)) : 0;
};

export const getSpeedrunEffectiveEnemyHP = (data: Map<string, any>, player: Player, baseHP: number): number => {
    const prayers = data.get('prayers') as Prayer[];
    const curse = (index: number): number => prayers.find(prayer => prayer.index === index)!.getCurseForPlayer(player);
    return baseHP * (1 + (curse(0) + (curse(7) + curse(8))) / 100);
};
