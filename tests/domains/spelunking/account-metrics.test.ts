import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

type AmberPreviewContext = {
    rawDepth: number;
    destroyedObjects: number;
    activeEffects: number[];
};

describe('Spelunking saved account metrics', () => {
    const playerID = 3;
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;
    let savedLevel: number;
    let savedFill: number;
    let savedManicEnabled: number;

    const gameValue = (label: string): number => {
        expect(extractionResults.extractions[label]).toBeDefined();
        expect(extractionResults.extractions[label].result).not.toBeNull();
        return getExtractedValue(extractionResults, label);
    };

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-account-metrics-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;

        // The retained source matches the server input. Warmup changes fill and stamina, not this source.
        const savedSpelunking = loadTestSave('latest').get('Spelunk');
        const savedRows: (number | string)[][] = typeof savedSpelunking === 'string'
            ? JSON.parse(savedSpelunking)
            : savedSpelunking;
        savedLevel = Number(savedRows[4][1]);
        savedFill = Number(savedRows[4][2]);
        savedManicEnabled = Number(Number(savedRows[4][10]) >= 1);
    });

    it('matches the saved Amber multiplier at the inactive depth-zero preview', () => {
        const context = extractionResults.extractions.amber_preview_context.result as AmberPreviewContext;
        expect(context.rawDepth).toBe(0);
        expect(context.destroyedObjects).toBe(0);
        expect(context.activeEffects).toHaveLength(13);
        expect(context.activeEffects.every(effect => effect === 0)).toBe(true);

        // Native depth zero includes the first depth bonus. This is not current-run Amber income.
        expect(spelunking.savedAmberGainMultiplier).toMatchLiveGameWithDetails(
            gameValue('saved_amber_gain_multiplier'),
            { tolerance: 0, context: 'Saved Amber multiplier with no active effects or destroyed objects' },
        );
    });

    it('matches Cave Node harvesting efficiency for the selected character', () => {
        expect(spelunking.getEfficiency(playerID)).toMatchLiveGameWithDetails(
            gameValue('spelunking_efficiency_player_3'),
            { tolerance: 0, context: 'Character 3 Cave Node harvesting efficiency, not tunnel POW' },
        );
    });

    it('keeps the saved Overstim level and fill without simulating pending levels', () => {
        expect(spelunking.overstim.level).toMatchLiveGameWithDetails(savedLevel, {
            tolerance: 0,
            context: 'Overstim level from the retained save',
        });
        expect(spelunking.overstim.level).toMatchLiveGameWithDetails(gameValue('overstim_level'), {
            tolerance: 0, context: 'Native saved Overstim level from the matching source',
        });
        expect(spelunking.overstim.fill).toMatchLiveGameWithDetails(savedFill, {
            tolerance: 0,
            context: 'Overstim fill from the retained save, not warmed runtime progress',
        });
    });

    it('matches the Overstim requirement and Amber bonus at the saved level', () => {
        expect(spelunking.overstim.threshold).toMatchLiveGameWithDetails(gameValue('overstim_threshold'), {
            tolerance: 0, context: 'Fill needed for the next Overstim level',
        });
        expect(spelunking.overstim.bonusPerLevel).toMatchLiveGameWithDetails(
            gameValue('overstim_bonus_per_level'),
            { tolerance: 0, context: 'Amber bonus percentage points per Overstim level' },
        );
        expect(spelunking.overstim.bonus).toMatchLiveGameWithDetails(gameValue('overstim_bonus'), {
            tolerance: 0, context: 'Amber bonus percentage points from saved Overstim levels',
        });
    });

    it('reports the amount still needed from the retained Overstim fill', () => {
        // Native warmup adds overflow. Subtract retained fill from the paired native requirement instead.
        const remainingSavedFill = Math.max(0, gameValue('overstim_threshold') - savedFill);
        expect(spelunking.overstim.remainingFill).toMatchLiveGameWithDetails(remainingSavedFill, {
            tolerance: 0, context: 'Remaining Overstim fill from the retained save, without pending-level simulation',
        });
    });

    it('matches extra Overstim fill and potential generation from all real characters', () => {
        expect(spelunking.overstim.fillBonusPercent).toMatchLiveGameWithDetails(
            gameValue('overstim_fill_bonus_percent'),
            { tolerance: 0, context: 'Extra Overstim fill percentage from stamina overflow' },
        );
        expect(spelunking.overstim.potentialFillPerHour).toMatchLiveGameWithDetails(
            gameValue('overstim_potential_fill_per_hour'),
            { tolerance: 0, context: 'Potential pooled fill per hour from real characters, regardless of current stamina' },
        );
    });

    it('matches the saved Manic toggle without inferring an active delve from depth records', () => {
        const enabled = Number(spelunking.manic.enabled);
        expect(enabled).toMatchLiveGameWithDetails(savedManicEnabled, {
            tolerance: 0, context: 'Manic Mode enabled state from the retained save',
        });
        expect(enabled).toMatchLiveGameWithDetails(gameValue('saved_manic_enabled'), {
            tolerance: 0, context: 'Manic Mode saved toggle, not an active-tunnel indicator',
        });
    });

    it('matches the next Grand chance only for tunnels eligible for another final-object roll', () => {
        // Ten real tunnels form a small set. The native helper alone also returns chances for unavailable tunnels.
        expect(spelunking.tunnels).toHaveLength(10);
        for (const tunnel of spelunking.tunnels) {
            const label = `tunnel_${tunnel.index}_next_grand_chance`;
            expect(extractionResults.extractions[label]).toBeDefined();
            const expectedChance = extractionResults.extractions[label].result;
            const chance = spelunking.getNextGrandDiscoveryChance(tunnel.index, playerID);

            if (expectedChance === null) {
                expect(chance).toBeUndefined();
            } else {
                expect(chance).toMatchLiveGameWithDetails(gameValue(label), {
                    tolerance: 0,
                    context: `${tunnel.data.name}: character 3 next eligible final-object Grand chance without active elixirs`,
                });
            }
        }
    });
});
