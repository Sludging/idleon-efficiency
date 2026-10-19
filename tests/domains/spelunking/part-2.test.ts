import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { assertChapterBonuses, characterIDs, expected } from './part-2-test-helpers';

describe('Spelunking Journal and stamina calculations', () => {
    let data: Map<string, unknown>;

    beforeAll(() => {
        data = loadGameDataFromSave('latest');
    });

    it('matches every modeled Journal bonus against the current native bonus list', () => {
        assertChapterBonuses(data.get('spelunking') as Spelunking);
    });

    it('matches the daily page-read limit and remaining allowance', () => {
        const owner = data.get('spelunking') as Spelunking;
        expect(owner.dailyReadLimit).toMatchLiveGameWithDetails(expected('daily_reads_limit'), { tolerance: 0 });
        expect(owner.dailyReadsRemaining).toMatchLiveGameWithDetails(expected('daily_reads_remaining'), { tolerance: 0 });
    });

    it('matches shared hourly stamina recharge', () => {
        expect((data.get('spelunking') as Spelunking).hourlyRecharge)
            .toMatchLiveGameWithDetails(expected('stamina_recharge_hourly'), { tolerance: 0 });
    });

    characterIDs.forEach(playerID => {
        it(`matches character ${playerID} maximum and saved-stamina refill`, () => {
            const owner = data.get('spelunking') as Spelunking;
            const stamina = owner.stamina[playerID];
            expect(stamina.maximum).toMatchLiveGameWithDetails(expected(`stamina_max_player_${playerID}`), {
                tolerance: 0, context: 'Character-specific maximum after shared modifiers are prepared',
            });
            expect(stamina.getHoursUntilFull(owner.hourlyRecharge)).toMatchLiveGameWithDetails(
                expected(`refill_hours_player_${playerID}`), { tolerance: 0, context: 'Refill estimate from saved stamina', },
            );
        });
    });
});
