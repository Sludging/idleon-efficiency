import { Sneaking, SneakingDailyCharmRolls, SneakingFloor } from '../../../data/domain/world-6/sneaking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NativeFloor = { index: number; maxHP: number | 'Infinity'; remainingHP: number | 'Infinity'; flowerStacks: number };
type NativeRolls = { used: number; pristineRemaining: number; symbolRemaining: number; symbolsUnlocked: boolean };

const floorIndices = Array.from({ length: 12 }, (_, index) => index);

describe('Sneaking current ninja progression and daily roll windows', () => {
    let sneaking: Sneaking;
    let floors: NativeFloor[];
    let rolls: NativeRolls;

    beforeAll(() => {
        const results: ExtractionResults = loadExtractionResults('sneaking-ninja-progression-data.json');
        validateExtractionHealth(results);
        floors = results.extractions.floor_progression.result as NativeFloor[];
        rolls = results.extractions.daily_charm_rolls.result as NativeRolls;
        sneaking = loadGameDataFromSave('latest').get('sneaking') as Sneaking;
    });

    const getFloor = (index: number): SneakingFloor => {
        return sneaking.floors[index];
    };


    it.each([6, 8])('occupied floor %i: shows its shared Funeral Flower stacks', index => {
        expect(getFloor(index).flowerStacks).toMatchLiveGameWithDetails(floors[index].flowerStacks, {
            tolerance: 0,
            context: `Occupied floor ${index}: shared Funeral Flowers for its current ninjas`,
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
