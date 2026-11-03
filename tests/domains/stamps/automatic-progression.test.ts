import { StampAutomaticProgression } from '../../../data/domain/world-1/stamps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const extractionResultsName = 'stamps-automatic-progression-data.json';

describe('Stamps automatic progression', () => {
    let progression: StampAutomaticProgression;
    let results: ExtractionResults;
    let bundleReceipts: Record<string, number>;
    let stampStackOwned: number;
    let summoningResults: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(results);
        const bundleResults = loadExtractionResults('bundle-ownership-data.json');
        validateExtractionHealth(bundleResults);
        bundleReceipts = bundleResults.extractions.bundles_received.result;

        const eventResults = loadExtractionResults('event-shop-ownership-data.json');
        validateExtractionHealth(eventResults);
        const eventOwnership: { index: number; owned: number }[] = eventResults.extractions.event_shop_ownership.result;
        const stampStack = eventOwnership.find(bonus => bonus.index === 1);
        if (!stampStack) {
            throw new Error('Missing native Stamp Stack ownership');
        }
        stampStackOwned = stampStack.owned;

        summoningResults = loadExtractionResults('summoning-win-bonus-data.json');
        validateExtractionHealth(summoningResults);
        const data = loadGameDataFromSave('latest');
        progression = data.get('stampAutomaticProgression') as StampAutomaticProgression;
    });

    it('matches the daily Gilded Stamp gain chance for the saved stamp levels', () => {
        // RiftStuff returns a probability. The public result uses percentage points.
        const expectedPercent = getExtractedValue(results, 'gilded_stamp_gain_chance') * 100;
        expect(progression.gildedStampGainChancePercent).toMatchLiveGameWithDetails(expectedPercent, {
            tolerance: 0,
            context: 'Daily Gilded Stamp gain chance, in percent, after the native Rift unlock gate',
        });
    });

    it('matches the No Stamp Left Behind daily stamp level count', () => {
        // Compare the total reset-loop count, not one contributing bonus or the Gilded Stamp balance.
        const expectedCount = getExtractedValue(results, 'no_stamp_left_behind_count');
        expect(progression.noStampLeftBehindLevelsPerDay).toMatchLiveGameWithDetails(expectedCount, {
            tolerance: 0,
            context: 'Stamp levels granted per daily reset by No Stamp Left Behind',
        });
    });

    it('matches daily stamp levels from the No Meal Left Behind bundle receipt', () => {
        const expectedLevels = bundleReceipts.bun_s === 1 ? 5 : 0;
        expect(progression.noStampLeftBehindSources.bundle).toMatchLiveGameWithDetails(expectedLevels, {
            tolerance: 0,
            context: 'Daily stamp levels from the independently captured bundle receipt',
        });
    });

    it('matches daily stamp levels from Stamp Stack ownership', () => {
        const expectedLevels = stampStackOwned === 1 ? 3 : 0;
        expect(progression.noStampLeftBehindSources.eventShop).toMatchLiveGameWithDetails(expectedLevels, {
            tolerance: 0,
            context: 'Daily stamp levels from the independently captured Stamp Stack ownership',
        });
    });

    it('matches the positive Summoning stamp reward after daily reset rounding', () => {
        const nativeReward = getExtractedValue(summoningResults, 'win_bonus_20');
        // DailyResetTick rounds after addition. The earlier bundle and event gains are integers.
        const expectedLevels = nativeReward > 0 ? Math.round(nativeReward) : 0;
        expect(progression.noStampLeftBehindSources.summoning).toMatchLiveGameWithDetails(expectedLevels, {
            tolerance: 0,
            context: 'Daily stamp levels from the independently captured Summoning winner reward',
        });
    });
});
