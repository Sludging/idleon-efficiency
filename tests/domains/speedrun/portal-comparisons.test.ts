import { getSpeedrunPortalEstimate } from '../../../data/domain/speedrun-comparison';
import type { SpeedrunCombatEstimate } from '../../../data/domain/speedrun';

describe('Speedrun portal kill counts', () => {
    const estimate: SpeedrunCombatEstimate = {
        reachable: true,
        maximumDamage: 100,
        multikillTiers: 0,
        multikillPercent: 0,
        killPerKill: 1,
        portalProgressPerKill: 100,
        killsNeeded: undefined,
    };

    it('needs one monster when its portal credit exactly meets the requirement', () => {
        const result = getSpeedrunPortalEstimate(estimate, 100);

        expect(result.reachable).toBe(true);
        expect(result.killsNeeded).toBe(1);
    });

    it('needs another monster when the requirement exceeds one monster of portal credit', () => {
        const result = getSpeedrunPortalEstimate(estimate, 101);

        expect(result.reachable).toBe(true);
        expect(result.killsNeeded).toBe(2);
    });

    it('rounds fractional portal credit up to a whole monster count', () => {
        const result = getSpeedrunPortalEstimate({ ...estimate, portalProgressPerKill: 2.5 }, 6);

        expect(result.reachable).toBe(true);
        expect(result.killsNeeded).toBe(3);
    });

    it('keeps an unreachable source without a monster count', () => {
        const result = getSpeedrunPortalEstimate({ ...estimate, reachable: false }, 100);

        expect(result.reachable).toBe(false);
        expect(result.killsNeeded).toBeUndefined();
    });

    it('keeps zero portal credit unreachable without a monster count', () => {
        const result = getSpeedrunPortalEstimate({ ...estimate, portalProgressPerKill: 0 }, 100);

        expect(result.reachable).toBe(false);
        expect(result.killsNeeded).toBeUndefined();
    });

    it('keeps negative portal credit unreachable without a monster count', () => {
        const result = getSpeedrunPortalEstimate({ ...estimate, portalProgressPerKill: -100 }, 100);

        expect(result.reachable).toBe(false);
        expect(result.killsNeeded).toBeUndefined();
    });

    it('keeps infinite portal credit unreachable without a monster count', () => {
        const result = getSpeedrunPortalEstimate({ ...estimate, portalProgressPerKill: Infinity }, 100);

        expect(result.reachable).toBe(false);
        expect(result.killsNeeded).toBeUndefined();
    });

    it('keeps NaN portal credit unreachable without a monster count', () => {
        const result = getSpeedrunPortalEstimate({ ...estimate, portalProgressPerKill: NaN }, 100);

        expect(result.reachable).toBe(false);
        expect(result.killsNeeded).toBeUndefined();
    });

    it('keeps an infinite requirement unreachable without a monster count', () => {
        const result = getSpeedrunPortalEstimate(estimate, Infinity);

        expect(result.reachable).toBe(false);
        expect(result.killsNeeded).toBeUndefined();
    });

    it('keeps a zero requirement unreachable without a monster count', () => {
        const result = getSpeedrunPortalEstimate(estimate, 0);

        expect(result.reachable).toBe(false);
        expect(result.killsNeeded).toBeUndefined();
    });
});
