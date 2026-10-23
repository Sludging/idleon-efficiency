import { Sneaking, SneakingActivity, SneakingDailyCharmRolls, SneakingFloor, SneakingPlayer } from '../../../data/domain/world-6/sneaking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NativeNinja = {
    index: number;
    floor: number;
    level: number;
    activity: SneakingActivity | 'KnockedOut';
    stealth: number;
    detectionPercent: number;
    equipment: ({ id: string; level: number } | null)[];
};
type NativeFloor = { index: number; maxHP: number | 'Infinity'; remainingHP: number | 'Infinity'; flowerStacks: number };
type NativeRolls = { used: number; pristineRemaining: number; symbolRemaining: number; symbolsUnlocked: boolean };

// All eleven real characters include an active group, a knockout, and a tied ninja.
const ninjaIndices = Array.from({ length: 11 }, (_, index) => index);
const floorIndices = Array.from({ length: 12 }, (_, index) => index);

describe('Sneaking current ninja progression and daily roll windows', () => {
    let sneaking: Sneaking;
    let ninjas: NativeNinja[];
    let floors: NativeFloor[];
    let rolls: NativeRolls;

    beforeAll(() => {
        const results: ExtractionResults = loadExtractionResults('sneaking-ninja-progression-data.json');
        validateExtractionHealth(results);
        ninjas = results.extractions.ninja_progression.result as NativeNinja[];
        floors = results.extractions.floor_progression.result as NativeFloor[];
        rolls = results.extractions.daily_charm_rolls.result as NativeRolls;
        sneaking = loadGameDataFromSave('latest').get('sneaking') as Sneaking;
    });

    const getFloor = (index: number): SneakingFloor => {
        return sneaking.floors[index];
    };

    it.each(ninjaIndices)('ninja %i: matches current stealth without replacing character gear or skill level', index => {
        const player: SneakingPlayer = sneaking.players[index];
        expect(player.stealth).toMatchLiveGameWithDetails(ninjas[index].stealth, {
            tolerance: 0,
            context: `Ninja ${index}: current stealth with real equipment and floor companions`,
            debugInfo: { floor: player.floor, level: player.level },
        });
    });

    it.each(ninjaIndices)('ninja %i: matches displayed detection percent with small probabilities preserved', index => {
        const player: SneakingPlayer = sneaking.players[index];
        // Native detection display multiplies the probability by 100 before formatting.
        expect(player.detectionChance * 100).toMatchLiveGameWithDetails(ninjas[index].detectionPercent, {
            tolerance: 0,
            context: `Ninja ${index}: native displayed detection percent, not final knockout chance`,
            debugInfo: { probability: player.detectionChance, stealth: player.stealth },
        });
    });

    it.each(ninjaIndices)('ninja %i: keeps the real current floor, Sneaking level, and activity', index => {
        const player = sneaking.players[index];
        const native = ninjas[index];
        expect(player.floor).toMatchLiveGameWithDetails(native.floor, { tolerance: 0, context: `Ninja ${index}: current floor` });
        expect(player.level).toMatchLiveGameWithDetails(native.level, { tolerance: 0, context: `Ninja ${index}: own Sneaking level` });
        // The capture uses a compact label for the same knocked-out activity.
        const nativeActivity = native.activity === 'KnockedOut' ? SneakingActivity.KnockedOut : native.activity;
        expect(player.activity).toBe(nativeActivity);
    });

    it.each([6, 8])('occupied floor %i: shows its shared Funeral Flower stacks', index => {
        expect(getFloor(index).flowerStacks).toMatchLiveGameWithDetails(floors[index].flowerStacks, {
            tolerance: 0,
            context: `Occupied floor ${index}: shared Funeral Flowers for its current ninjas`,
        });
    });

    it.each(ninjaIndices)('ninja %i: shows the four worn slots and their saved levels, not inventory-best copies', index => {
        const equipment = sneaking.players[index].equipment;
        const slots = [equipment.hat, equipment.weapon, equipment.Trinket1, equipment.Trinket2];
        ninjas[index].equipment.forEach((native, slot) => {
            if (native === null) {
                expect(slots[slot]).toBeUndefined();
                return;
            }
            expect(slots[slot]?.data.internalId).toBe(native.id);
            expect(slots[slot]?.level).toMatchLiveGameWithDetails(native.level, {
                tolerance: 0,
                context: `Ninja ${index}, equipped slot ${slot}: saved item level`,
            });
        });
    });

    it.each(floorIndices)('floor %i: matches current Mastery door maximum and remaining HP', index => {
        const floor = getFloor(index);
        const native = floors[index];
        (['maxHP', 'remainingHP'] as const).forEach(field => {
            if (native[field] === 'Infinity') {
                // JSON cannot represent Infinity; the extraction records its explicit native value.
                expect(floor[field]).toBe(Number.POSITIVE_INFINITY);
                return;
            }
            expect(floor[field]).toMatchLiveGameWithDetails(Number(native[field]), {
                tolerance: 0,
                context: `Floor ${index}: ${field} under the selected Mastery`,
                debugInfo: { damageDone: floor.damageDone },
            });
        });
    });

    it('shows daily charm use and the remaining native replacement windows', () => {
        const daily: SneakingDailyCharmRolls = sneaking.dailyCharmRolls;
        expect(daily.used).toMatchLiveGameWithDetails(rolls.used, { tolerance: 0, context: 'Daily charm rolls used across all ninjas' });
        // The native generation branch defines these positive-chance replacement windows.
        expect(daily.pristineRemaining).toMatchLiveGameWithDetails(rolls.pristineRemaining, {
            tolerance: 0,
            context: 'Remaining pristine positions in the native positive-chance window',
        });
        expect(daily.symbolRemaining).toMatchLiveGameWithDetails(rolls.symbolRemaining, {
            tolerance: 0,
            context: 'Remaining symbol positions in the native positive-chance window',
        });
        expect(daily.symbolsUnlocked).toBe(rolls.symbolsUnlocked);
    });
});
