import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { assertPairing, assertPopulatedAccount, characterIDs, expected, saved } from './part-2-test-helpers';

// Six real chapters exercise add, decay, decayMulti, and three- and four-bonus chapters.
// The retained save observes only full or over-cap stamina, not a partial refill duration.
describe('Spelunking Part 2 shared Journal and saved character progression', () => {
    let data: Map<string, unknown>;
    beforeAll(() => {
        assertPairing();
        data = loadGameDataFromSave('latest');
    });

    it('populates all six page-backed chapters, stack locations, reads, and every character', () => {
        assertPopulatedAccount(data);
    });

    characterIDs.forEach(playerID => {
        it(`matches character ${playerID} maximum and saved-snapshot refill without changing saved stamina`, () => {
            const owner = data.get('spelunking') as Spelunking;
            const stamina = owner.stamina[playerID];
            expect(stamina.current).toBe(saved('Spelunk')[3][playerID]);
            expect(stamina.maximum).toMatchLiveGameWithDetails(expected(`stamina_max_player_${playerID}`), {
                tolerance: 0, context: 'Character-specific maximum after shared modifiers are prepared',
            });
            expect(stamina.getHoursUntilFull(owner.hourlyRecharge)).toMatchLiveGameWithDetails(
                expected(`refill_hours_player_${playerID}`), { tolerance: 0, context: 'Originating saved amount, not current runtime amount' },
            );
        });
    });

    it('keeps chest pages separate from the one character-held page stack', () => {
        const owner = data.get('spelunking') as Spelunking;
        expect(owner.chapters.map(chapter => chapter.chestPageStacks.map(item => item.count)))
            .toEqual([[626302], [2013540], [3186], [9654], [3765609], []]);
        owner.chapters.forEach(chapter => characterIDs.forEach(id => {
            expect(chapter.playerPageStacks[id].map(item => item.count))
                .toEqual(chapter.index === 5 && id === 6 ? [20127] : []);
        }));
        expect(owner.stamina[6].current).toBe(2635);
        expect(owner.stamina[6].current).toBeGreaterThan(owner.stamina[6].maximum);
    });
});
