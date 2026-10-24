import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

type NativeStaminaInput = {
    savedCurrent: number;
    maximum: number;
    rechargePerHour: number;
};

describe('Overstim next-level saved-snapshot estimate', () => {
    let spelunking: Spelunking;
    let savedLevel: number;
    let savedFill: number;
    let nativeThreshold: number;
    let nativeFillMultiplier: number;
    let nativeStamina: NativeStaminaInput[];

    const nativeValue = (results: ExtractionResults, label: string): number => {
        expect(results.extractions[label]).toBeDefined();
        expect(results.extractions[label].result).not.toBeNull();
        const value = getExtractedValue(results, label);
        expect(Number.isFinite(value)).toBe(true);
        return value;
    };

    // Native 1.24 overflow caller: idleon1.24.txt:284511-284522.
    // Project one qualifying update from original saved stamina, not warmed runtime stamina.
    const projectedNativeFill = (hours: number): number => {
        let fill = savedFill;
        for (const stamina of nativeStamina) {
            const afterRecharge = stamina.savedCurrent + stamina.rechargePerHour * hours;
            if (afterRecharge > stamina.maximum) {
                fill += nativeFillMultiplier * (afterRecharge - stamina.maximum);
            }
        }
        return fill;
    };

    beforeAll(() => {
        const accountResults = loadExtractionResults('spelunking-account-metrics-data.json');
        const staminaResults = loadExtractionResults('spelunking-part-2-data.json');
        validateExtractionHealth(accountResults);
        validateExtractionHealth(staminaResults);

        const save = loadTestSave('latest');
        const rawSpelunking = save.get('Spelunk');
        const savedRows: (number | string)[][] = typeof rawSpelunking === 'string'
            ? JSON.parse(rawSpelunking)
            : rawSpelunking;
        const playerNames: string[] = save.get('playerNames');
        const rechargeByPlayer = accountResults.extractions.native_stamina_regen_per_hour_by_player.result as number[];

        savedLevel = Number(savedRows[4][1]);
        savedFill = Number(savedRows[4][2]);
        nativeThreshold = nativeValue(accountResults, 'overstim_threshold');
        nativeFillMultiplier = 1 + nativeValue(accountResults, 'overstim_fill_bonus_percent') / 100;

        // This retained account has eleven characters and one unused padded stamina slot.
        expect(playerNames).toHaveLength(nativeValue(accountResults, 'real_character_count'));
        expect(rechargeByPlayer).toHaveLength(playerNames.length);
        expect(nativeValue(accountResults, 'overstim_level')).toBe(savedLevel);
        expect(nativeValue(accountResults, 'overstim_unlocked')).toBe(1);
        nativeStamina = playerNames.map((_, playerID) => ({
            savedCurrent: Number(savedRows[3][playerID]),
            maximum: nativeValue(staminaResults, `stamina_max_player_${playerID}`),
            rechargePerHour: rechargeByPlayer[playerID],
        }));
        expect(nativeStamina.every(stamina => Number.isFinite(stamina.savedCurrent)
            && Number.isFinite(stamina.rechargePerHour) && stamina.rechargePerHour > 0)).toBe(true);

        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
    });

    it('includes missing stamina and pending excess once when estimating the next saved-level threshold', () => {
        // These observed inputs exercise delayed contributors and saved overmaximum stamina together.

        // Bisection independently solves the native overflow projection, not the application's interval algorithm.
        // No native ETA helper or future completion observation exists for this snapshot.
        let lowerHours = 0;
        let upperHours = 1;
        while (projectedNativeFill(upperHours) < nativeThreshold) {
            upperHours *= 2;
        }
        for (let iteration = 0; iteration < 80; iteration++) {
            const middleHours = (lowerHours + upperHours) / 2;
            if (projectedNativeFill(middleHours) >= nativeThreshold) {
                upperHours = middleHours;
            } else {
                lowerHours = middleHours;
            }
        }

        const estimate = spelunking.overstim.nextLevelEstimate;
        expect(estimate.status).toBe('estimated');
        if (estimate.status !== 'estimated') {
            throw new Error(`Expected an Overstim duration for the retained account; received ${estimate.status}`);
        }
        expect(estimate.hours).toMatchLiveGameWithDetails(upperHours, {
            tolerance: 0,
            context: 'Source-derived next-level hours from original saved stamina and paired native operands; no stamina spent',
        });
    });
});
