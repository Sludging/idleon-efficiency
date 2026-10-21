import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Player } from '../../../data/domain/player';
import type { Hole } from '../../../data/domain/world-5/hole/hole';

describe('Hole part-four public outputs', () => {
    it('matches the paired Well, Lamp, and Harp values from the normal import', () => {
        const results = loadExtractionResults('hole-part4-public-outputs-data.json');
        validateExtractionHealth(results);
        const gameData = loadGameDataFromSave('latest');
        const player = getTargetPlayer(gameData.get('players') as Player[]);
        const hole = gameData.get('hole') as Hole;
        const context = results.extractions.active_context.result as {
            playerId: number;
            version: { title: string; version: string };
        };
        expect(hole.well.buckets[0].rate).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'well_bucket_0_rate'),
            { tolerance: 0, context: 'Well bucket 0 fill rate per hour' },
        );
        expect(hole.lamp.wishesPerDay).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'lamp_wishes_per_day'),
            { tolerance: 0, context: 'Lamp average Wishes per day' },
        );
        expect(hole.harp.powerPerHour).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'harp_power_per_hour'),
            { tolerance: 0, context: 'Harp power generated per hour' },
        );
    });
});
